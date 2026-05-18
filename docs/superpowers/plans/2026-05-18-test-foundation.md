# Test Foundation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development.

**Goal:** Build a real safety net under the DMARC ingest pipeline before contributors start touching the parser. Currently the parser has zero integration tests — a single careless XML change could ship malformed-record bugs to every Vexa deployment.

**Architecture:** Four task groups. (A) Sanitized real-world DMARC fixtures + integration tests for `parseDmarcXml`. (B) Idempotency + IP-dedup regression tests around `ingestParsedReport`. (C) ZIP edge-case coverage (oversize archive, >MAX_FILES, corrupt CRC, password-protected). (D) Coverage tooling + migration smoke as a CI job.

**Tech Stack:** Vitest, fixtures under `test/fixtures/dmarc/`, in-memory better-sqlite3 for ingestion tests.

---

## Decisions made

1. **Fixtures are synthetic but RFC-7489-shaped**, mirroring the report shapes the major reporters emit. Reasonable surrogate for real samples without IP/email leakage.
2. **In-memory SQLite** (`better-sqlite3` with `:memory:` URL) for ingestion tests — fast and deterministic.
3. **Coverage tooling**: `@vitest/coverage-v8`. Threshold left as informational only on first pass.
4. **Migration smoke**: a dedicated job in `ci.yml` that runs `pnpm db:migrate` against an empty DB and against a copy of the fixture DB, asserting exit code 0 both times.

## File structure

### Create
- `test/fixtures/dmarc/google.xml` — Google/Gmail aggregate report shape
- `test/fixtures/dmarc/microsoft.xml` — Microsoft 365 / Outlook shape
- `test/fixtures/dmarc/yahoo.xml` — Yahoo shape
- `test/fixtures/dmarc/single-record.xml` — `<record>` as object (not array)
- `test/fixtures/dmarc/multi-record.xml` — multiple `<record>` entries
- `test/fixtures/dmarc/empty-records.xml` — well-formed but with `<feedback>` and metadata only
- `test/parseDmarcXmlFixtures.test.ts` — parametrized table-driven integration test
- `test/ingestIdempotency.test.ts`
- `test/ingestIpDedup.test.ts`
- `test/zipEdgeCases.test.ts`
- `test/migrationSmoke.test.ts` — runs `runMigrations()` against `:memory:` SQLite
- (CI) update `.github/workflows/ci.yml` to add `migration-smoke` job
- (Tooling) update `package.json` to add `test:coverage` script and `@vitest/coverage-v8` devDep

### Modify
- `vitest.config.ts` — opt-in coverage block (v8 provider, `coverage.include: ['services/**', 'utils/**', 'actions/**', 'validators/**', 'formatters/**', 'mappers/**']`, `text` + `lcov` reporters)
- `package.json` — `"test:coverage": "vitest run --coverage --config vitest.config.ts"`

---

## Task A — DMARC parser fixtures

### Step 1: Drop the 6 fixtures under `test/fixtures/dmarc/`

Each is a small but realistic aggregate report. Use placeholder IPs / domains so no real data leaks.

`test/fixtures/dmarc/google.xml`:
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<feedback>
  <version>1.0</version>
  <report_metadata>
    <org_name>google.com</org_name>
    <email>noreply-dmarc-support@google.com</email>
    <extra_contact_info>https://support.google.com/a/answer/2466580</extra_contact_info>
    <report_id>16823942947293847234</report_id>
    <date_range>
      <begin>1717286400</begin>
      <end>1717372799</end>
    </date_range>
  </report_metadata>
  <policy_published>
    <domain>example.com</domain>
    <adkim>r</adkim>
    <aspf>r</aspf>
    <p>quarantine</p>
    <sp>quarantine</sp>
    <pct>100</pct>
  </policy_published>
  <record>
    <row>
      <source_ip>203.0.113.10</source_ip>
      <count>42</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>example.com</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>example.com</domain>
        <result>pass</result>
        <selector>s1</selector>
      </dkim>
      <spf>
        <domain>example.com</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>198.51.100.7</source_ip>
      <count>3</count>
      <policy_evaluated>
        <disposition>quarantine</disposition>
        <dkim>fail</dkim>
        <spf>fail</spf>
        <reason>
          <type>forwarded</type>
          <comment>Forwarded by a list</comment>
        </reason>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>example.com</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>example.com</domain>
        <result>fail</result>
        <selector>s1</selector>
      </dkim>
      <spf>
        <domain>list.example.org</domain>
        <result>softfail</result>
      </spf>
    </auth_results>
  </record>
</feedback>
```

`test/fixtures/dmarc/microsoft.xml` (Outlook uses `enterprise.protection.outlook.com` org name, slightly different metadata field order):
```xml
<?xml version="1.0" encoding="utf-8"?>
<feedback>
  <report_metadata>
    <org_name>Enterprise Outlook</org_name>
    <email>dmarcreport@microsoft.com</email>
    <report_id>78c4f0a3-5681-4ad0-b6f1-2c0a7b441111</report_id>
    <date_range>
      <begin>1717286400</begin>
      <end>1717372799</end>
    </date_range>
  </report_metadata>
  <policy_published>
    <domain>example.com</domain>
    <adkim>s</adkim>
    <aspf>s</aspf>
    <p>reject</p>
    <pct>100</pct>
  </policy_published>
  <record>
    <row>
      <source_ip>2001:db8::abcd</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>reject</disposition>
        <dkim>fail</dkim>
        <spf>fail</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>example.com</header_from>
    </identifiers>
    <auth_results>
      <spf>
        <domain>example.com</domain>
        <result>permerror</result>
      </spf>
    </auth_results>
  </record>
</feedback>
```

`test/fixtures/dmarc/yahoo.xml`:
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<feedback>
  <report_metadata>
    <org_name>Yahoo</org_name>
    <email>dmarchelp@yahooinc.com</email>
    <report_id>yh20260601.1717372799.example.com</report_id>
    <date_range>
      <begin>1717286400</begin>
      <end>1717372799</end>
    </date_range>
  </report_metadata>
  <policy_published>
    <domain>example.com</domain>
    <adkim>r</adkim>
    <aspf>r</aspf>
    <p>none</p>
    <pct>100</pct>
  </policy_published>
  <record>
    <row>
      <source_ip>192.0.2.55</source_ip>
      <count>17</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>fail</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>example.com</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>example.com</domain>
        <result>pass</result>
      </dkim>
      <spf>
        <domain>example.com</domain>
        <result>fail</result>
      </spf>
    </auth_results>
  </record>
</feedback>
```

`test/fixtures/dmarc/single-record.xml`:
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<feedback>
  <report_metadata>
    <org_name>some-mailer.example</org_name>
    <email>dmarc@some-mailer.example</email>
    <report_id>singlerec-2026-06</report_id>
    <date_range>
      <begin>1717286400</begin>
      <end>1717372799</end>
    </date_range>
  </report_metadata>
  <policy_published>
    <domain>example.com</domain>
    <p>none</p>
  </policy_published>
  <record>
    <row>
      <source_ip>203.0.113.99</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>example.com</header_from>
    </identifiers>
    <auth_results>
      <dkim><domain>example.com</domain><result>pass</result></dkim>
      <spf><domain>example.com</domain><result>pass</result></spf>
    </auth_results>
  </record>
</feedback>
```

`test/fixtures/dmarc/multi-record.xml`: clone of `google.xml` with 4 records (vary source IPs and counts).

`test/fixtures/dmarc/empty-records.xml`:
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<feedback>
  <report_metadata>
    <org_name>zero-records.example</org_name>
    <email>dmarc@zero-records.example</email>
    <report_id>zerorecs-2026-06</report_id>
    <date_range>
      <begin>1717286400</begin>
      <end>1717372799</end>
    </date_range>
  </report_metadata>
  <policy_published>
    <domain>example.com</domain>
    <p>none</p>
  </policy_published>
</feedback>
```

### Step 2: Write `test/parseDmarcXmlFixtures.test.ts`

```ts
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { parseDmarcXml } from '../utils/dmarc/parseDmarcXml'

const FIXTURE_DIR = path.join(__dirname, 'fixtures', 'dmarc')

const cases: Array<{
  file: string
  domain: string
  reportId: string
  expectedEvents: number
}> = [
  { file: 'google.xml',         domain: 'example.com', reportId: '16823942947293847234', expectedEvents: 2 },
  { file: 'microsoft.xml',      domain: 'example.com', reportId: '78c4f0a3-5681-4ad0-b6f1-2c0a7b441111', expectedEvents: 1 },
  { file: 'yahoo.xml',          domain: 'example.com', reportId: 'yh20260601.1717372799.example.com', expectedEvents: 1 },
  { file: 'single-record.xml',  domain: 'example.com', reportId: 'singlerec-2026-06', expectedEvents: 1 },
  { file: 'multi-record.xml',   domain: 'example.com', reportId: '16823942947293847234', expectedEvents: 4 },
  { file: 'empty-records.xml',  domain: 'example.com', reportId: 'zerorecs-2026-06', expectedEvents: 0 },
]

describe('parseDmarcXml fixtures', () => {
  for (const c of cases) {
    it(c.file, () => {
      const buf = readFileSync(path.join(FIXTURE_DIR, c.file))
      const result = parseDmarcXml(buf)
      expect(result.domain).toBe(c.domain)
      expect(result.rawReport.reportId).toBe(c.reportId)
      expect(result.events).toHaveLength(c.expectedEvents)
    })
  }

  it('rejects DOCTYPE/ENTITY (regression for the billion-laughs fixture)', () => {
    const buf = readFileSync(path.join(FIXTURE_DIR, 'billion-laughs.xml'))
    expect(() => parseDmarcXml(buf)).toThrow(/DOCTYPE/)
  })
})
```

`multi-record.xml` may use a duplicated reportId from `google.xml` since it's a separate file — the ID is just verified to match the value the file contains. Adjust expected values once the implementer writes the actual fixture.

### Commit

```bash
git add test/fixtures/dmarc test/parseDmarcXmlFixtures.test.ts
git commit -m "test(dmarc): parser fixtures for Google/Microsoft/Yahoo + single/multi/empty"
```

---

## Task B — Ingest idempotency + IP dedup

### Step 1: `test/ingestIdempotency.test.ts`

```ts
import { describe, expect, it, beforeEach } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { parseDmarcXml } from '../utils/dmarc/parseDmarcXml'
import { ingestParsedReport } from '../services/reports/ingestParsedReport'

const FIXTURE_DIR = path.join(__dirname, 'fixtures', 'dmarc')

// Tests assume the same in-memory DB context as the rest of the suite — the
// repo uses better-sqlite3 with `DATABASE_URL=file:./data/vexa.db` in dev.
// Override to `:memory:` for tests via env at vitest setup. The repo's
// existing tests in test/getDomainDnsRecords.test.ts already rely on this.
// If the test infrastructure doesn't have a memory DB shim, see
// `vitest.config.ts` and `lib/db/getDb.ts` for how DATABASE_URL is read,
// and add a shim file under test/setup.ts loaded via `vitest.config.ts`'s
// setupFiles.

describe('ingestParsedReport idempotency', () => {
  beforeEach(async () => {
    // Reset relevant tables. Implementation detail: import the schema
    // and `getDb().delete(table).run()` for raw_reports, normalized_events,
    // normalized_event_dkim_results, normalized_event_policy_overrides,
    // domains, ip_addresses. Use the order required by FK constraints.
  })

  it('ingests a Google fixture exactly once', async () => {
    const buf = readFileSync(path.join(FIXTURE_DIR, 'google.xml'))
    const parsed = parseDmarcXml(buf)
    const first = await ingestParsedReport(parsed)
    expect(first.ingested).toBe(true)
    expect(first.rawReportId).toBeGreaterThan(0)
  })

  it('skips a duplicate reportId', async () => {
    const buf = readFileSync(path.join(FIXTURE_DIR, 'google.xml'))
    const parsed = parseDmarcXml(buf)
    const first = await ingestParsedReport(parsed)
    expect(first.ingested).toBe(true)
    const second = await ingestParsedReport(parsed)
    expect(second.ingested).toBe(false)
    expect((second as { reason?: string }).reason).toMatch(/duplicate/i)
  })
})
```

The `beforeEach` cleanup is implementation-dependent. If the existing test suite doesn't have a DB reset helper, create `test/helpers/resetDmarcDb.ts` that drops rows from the relevant tables in dependency order. Alternative: create a fresh `:memory:` DB per test by parameterizing `getDb()` via an env var (`VEXA_TEST_DB=:memory:`).

### Step 2: `test/ingestIpDedup.test.ts`

```ts
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { parseDmarcXml } from '../utils/dmarc/parseDmarcXml'
import { ingestParsedReport } from '../services/reports/ingestParsedReport'
import { getDb, ipAddresses } from '@/lib/db'

describe('IP dedup on ingest', () => {
  it('does not duplicate IP rows when the same IP appears in many events', async () => {
    // Build a synthetic ParseResult with 50 events that all share one
    // source IP. Either parse `google.xml` then mutate the event list,
    // or hand-construct the ParseResult shape.
    const buf = readFileSync(path.join(FIXTURE_DIR, 'google.xml'))
    const parsed = parseDmarcXml(buf)
    // Inflate the event list:
    const baseEvent = parsed.events[0]!
    parsed.events = Array.from({ length: 50 }, (_, i) => ({
      ...baseEvent,
      count: i + 1,
    }))
    parsed.rawReport.reportId = 'dedup-' + Date.now()

    const before = getDb().select().from(ipAddresses).all().length
    const result = await ingestParsedReport(parsed)
    expect(result.ingested).toBe(true)
    const after = getDb().select().from(ipAddresses).all().length
    expect(after - before).toBe(1)
  })
})

const FIXTURE_DIR = path.join(__dirname, 'fixtures', 'dmarc')
```

### Commit

```bash
git add test/ingestIdempotency.test.ts test/ingestIpDedup.test.ts test/helpers/
git commit -m "test(ingest): idempotency on duplicate report_id + IP dedup per report"
```

---

## Task C — ZIP edge cases

### Step 1: `test/zipEdgeCases.test.ts`

Use `yauzl-promise` or build small zip buffers programmatically with `node:zlib` + a minimal local-file-header encoder. Simpler: use `archiver` (already in devDeps? check) OR write a small helper that wraps `yauzl`'s encoder. Simpler still: pre-build the fixtures and check them in.

For brevity, build fixtures programmatically from buffers:

```ts
import { describe, expect, it } from 'vitest'
import { extractXmlFromZip } from '../utils/dmarc/extractXmlFromZip'
import { MAX_FILES_IN_ARCHIVE } from '../utils/dmarc/maxFilesInArchive'

// A tiny zip-builder helper. yauzl can READ zips but not write them.
// Use `node:zlib` to deflate-raw each entry and assemble the central
// directory by hand. Or pull `adm-zip` as a devDep purely for fixture
// construction — quick path.
//
// If adding adm-zip is undesirable, write a `test/helpers/buildZip.ts`
// that uses Node's stdlib deflateRawSync to produce a minimal store/deflate
// archive. Both options are acceptable.

describe('ZIP edge cases', () => {
  it('rejects an archive with more than MAX_FILES_IN_ARCHIVE entries', async () => {
    const zip = buildZip(
      Array.from({ length: MAX_FILES_IN_ARCHIVE + 1 }, (_, i) => ({
        name: `r${i}.xml`,
        content: Buffer.from('<feedback/>'),
      })),
    )
    const result = await extractXmlFromZip(zip)
    expect(result).toBeNull()
  })

  it('rejects an archive with a zip-slip filename', async () => {
    const zip = buildZip([
      { name: '../etc/passwd.xml', content: Buffer.from('<feedback/>') },
    ])
    const result = await extractXmlFromZip(zip)
    expect(result).toBeNull()
  })

  it('returns the first .xml entry when multiple are present (and the rest are safe-named)', async () => {
    const zip = buildZip([
      { name: 'a.xml', content: Buffer.from('<feedback>AAA</feedback>') },
      { name: 'b.xml', content: Buffer.from('<feedback>BBB</feedback>') },
    ])
    const result = await extractXmlFromZip(zip)
    expect(result?.toString()).toContain('AAA')
  })
})

function buildZip(entries: Array<{ name: string; content: Buffer }>): Buffer {
  // Build a minimal STORE-method zip (no compression) so we don't need
  // a deflate encoder. Each local file header + central directory header
  // is a few dozen bytes. The implementer writes this helper or pulls
  // `adm-zip`.
  throw new Error('TODO implementer: buildZip helper')
}
```

The implementer's call: either embed a `buildZip` helper using Node stdlib, or add `adm-zip` to devDependencies and use it. If `adm-zip` is added, document it in CHANGELOG under Tooling.

If implementing `buildZip` manually proves too time-expensive, drop in three pre-built `.zip` files under `test/fixtures/dmarc/` (`many-entries.zip`, `zip-slip.zip`, `two-xml-entries.zip`) and check them in. Pre-built bytes are perfectly reproducible.

### Commit

```bash
git add test/zipEdgeCases.test.ts test/helpers/buildZip.ts  # or test/fixtures/dmarc/*.zip
git commit -m "test(dmarc): zip-slip, > MAX_FILES, and multi-xml selection regression"
```

---

## Task D — Coverage tooling + migration smoke CI job

### Step 1: Coverage tooling

Edit `package.json` — add to devDependencies (the implementer must run `pnpm add -D @vitest/coverage-v8` to also update the lockfile):

```
"@vitest/coverage-v8": "^4.1.6"
```

Add to scripts:
```
"test:coverage": "vitest run --coverage --config vitest.config.ts"
```

Edit `vitest.config.ts` to add a `coverage` block under `test:`. Read the file first; preserve existing options. Then:

```ts
coverage: {
  provider: 'v8',
  reporter: ['text', 'lcov', 'html'],
  include: [
    'actions/**',
    'formatters/**',
    'lib/**',
    'mappers/**',
    'services/**',
    'utils/**',
    'validators/**',
  ],
  exclude: [
    '**/index.ts',
    '**/*.d.ts',
    '**/types/**',
  ],
},
```

### Step 2: Migration smoke as a vitest test

```ts
// test/migrationSmoke.test.ts
import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

describe('migration smoke', () => {
  it('runMigrations applies cleanly to a fresh empty DB', async () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'vexa-mig-'))
    const dbPath = path.join(tmp, 'vexa.db')
    process.env.DATABASE_URL = `file:${dbPath}`
    // The runMigrations module reads DATABASE_URL via getDatabaseUrl().
    // It assumes CWD has a `drizzle/` dir — that's true in tests.
    const { runMigrations } = await import('../lib/db/runMigrations')
    expect(() => runMigrations()).not.toThrow()
    expect(fs.existsSync(dbPath)).toBe(true)
    fs.rmSync(tmp, { recursive: true })
  })
})
```

### Step 3: Update CI to run migration smoke and report coverage

Add to `.github/workflows/ci.yml` the `quality-gate` job already runs vitest. The new test runs as part of that. Optional: add a separate job that runs `pnpm test:coverage` and uploads the lcov to Codecov; skip Codecov for now (no token) but the script is there.

### Commit

```bash
git add package.json pnpm-lock.yaml vitest.config.ts test/migrationSmoke.test.ts
git commit -m "test: coverage tooling (@vitest/coverage-v8) + migration smoke"
```

---

## Self-review

- 6 fixtures + a parser integration test cover the major reporter shapes.
- Idempotency + IP dedup are pinned (the IP dedup test specifically prevents Plan 4's optimization from silently breaking).
- ZIP edge cases lock in the Task 9 (Plan 1) hardening.
- Coverage tooling is opt-in via `pnpm test:coverage`; no threshold enforced yet.
- Migration smoke runs in CI via the existing quality-gate job's `pnpm test` invocation.
