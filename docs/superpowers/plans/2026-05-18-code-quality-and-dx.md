# Code Quality + DX Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development.

**Goal:** Close the post-launch code-quality and DX gaps from the audit + the bug surfaced by Plan 3 Task D. Each task is independently mergeable.

## Tasks

### Task 1 — Fix `file:` URL absolute-path resolver

**Files:** `lib/db/runMigrations.ts`, `lib/db/client.ts`, optionally extract `lib/db/resolveDbFilePath.ts`.

`/^file:\/?/` strips both `file:` and one optional slash, turning `file:/abs/path.db` into `abs/path.db` (relative to cwd). Plan 3 Task D documented this. The user's docker default `file:./data/vexa.db` works by coincidence; an absolute `file:/var/lib/vexa/vexa.db` does not.

Replace the regex with proper URL parsing:

```ts
// lib/db/resolveDbFilePath.ts
import path from 'node:path'

export function resolveDbFilePath(databaseUrl: string): string {
  if (!databaseUrl.startsWith('file:')) return databaseUrl
  const stripped = databaseUrl.slice('file:'.length)
  // file://host/path (URI form, rarely used) — keep the absolute path part
  const withoutAuthority = stripped.startsWith('//')
    ? stripped.slice(2).replace(/^[^/]*/, '')
    : stripped
  if (withoutAuthority.startsWith('/')) {
    return withoutAuthority           // absolute path
  }
  return path.resolve(process.cwd(), withoutAuthority)  // relative
}
```

Update both `lib/db/runMigrations.ts:16` and `lib/db/client.ts:14` to import this helper. Update `test/migrationSmoke.test.ts` to use a path consistent with the real resolution and drop the comment about the bug.

Test: `test/resolveDbFilePath.test.ts` with cases for relative, absolute, no-prefix, double-slash forms.

Commit: `fix(db): resolve file: URLs correctly for absolute paths`.

### Task 2 — Consolidate `store/` + `stores/` + factories in `hooks/`

**Files:** delete `store/` and `stores/` top-level dirs; move state types to live next to the hook factories that consume them, or to `types/stores/`.

Inventory:
- `store/index.ts` re-exports from `hooks/dashboard`
- `store/DashboardFiltersState.ts` (type)
- `stores/index.ts` re-exports from `hooks/core`
- `stores/ListState.ts` (type)
- `hooks/dashboard/useDashboardFilters.ts` (zustand `create`)
- `hooks/core/useListState.ts` (zustand `create`)

Decision: keep the factories in `hooks/`, move the types to `types/stores/<Name>State.ts` next to all the other types, delete `store/` and `stores/`. Update every import. Run `pnpm type-check` + `pnpm lint` to verify nothing broken.

Commit: `refactor: consolidate state types under types/stores; remove store/ and stores/`.

### Task 3 — Monaco lazy import on /ingest

**Files:** `components/ingest/ProcessedEmailsTable.tsx`, `components/reports/index.ts`.

Current: `components/ingest/ProcessedEmailsTable.tsx:3` imports `XmlViewer` directly (~3 MB Monaco bundle). Fix: switch to `LazyXmlViewer`. Remove the eager `export { default as XmlViewer }` and `export * from './XmlViewer'` from `components/reports/index.ts` (the latter also violates the no-`export *` rule).

Commit: `perf(ingest): import LazyXmlViewer instead of XmlViewer (drops ~3 MB monaco from /ingest route)`.

### Task 4 — N+1 fix in `getDomainsSummaryAll`

**Files:** `services/reports/getDomainsSummaryAll.ts`, `services/reports/getDomainSummary.ts` (refactor in place; keep `getDomainSummary` for single-domain use).

Today: `Promise.all(domainRows.map(d => getDomainSummary(d.id, from, to)))` — 2 queries per domain, all events scanned + aggregated in JS. Rewrite as a single Drizzle query grouped by `domains.id` with SQL `sum(case when ...)` for pass/fail counts. Keep `getDomainSummary(domainId, from, to)` for single-domain callers.

Add a regression test: insert 3 domains × 5 reports × 10 events into an in-memory DB (reuse `test/setup/setupTestDb.ts` + `runMigrations`), call `getDomainsSummaryAll`, assert event totals match the per-domain sum.

Commit: `perf(reports): GROUP BY in SQL for getDomainsSummaryAll (eliminates N+1)`.

### Task 5 — Index on `normalized_events.reportEndDate`

**Files:** `lib/db/schema/normalized-event.ts`, generate a new Drizzle migration with `drizzle-kit generate`.

Today: `services/reports/getTrendStats.ts`, `getAggregateStats.ts`, and `getDomainSummary.ts` filter on `reportEndDate` but the schema only indexes `(domainId, reportBeginDate)`. Add `index('event_report_end_idx').on(reportEndDate)`. Run `pnpm db:generate` to produce the migration SQL.

Commit: `perf(db): add index on normalized_events.reportEndDate`.

### Task 6 — Typed `lib/env.ts`

**Files:** `lib/env.ts`, optionally a `types/env/AppEnv.ts`.

19 files touch `process.env` today. Centralize via a Zod-validated module that's imported once at boot:

```ts
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().default('file:./data/vexa.db'),
  SECRET_KEY: z.string().default(''),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  VEXA_ALLOW_REMOTE_INSTALL: z.enum(['0', '1']).default('0'),
  VEXA_ALLOWED_ORIGINS: z.string().default(''),
  VEXA_UPDATE_CHECK_ENABLED: z.string().default('true'),
  VEXA_UPDATE_REPO: z.string().optional(),
  VEXA_LOG_FORMAT: z.enum(['json', 'text']).optional(),
  VEXA_HAS_SUPERVISOR: z.string().optional(),
  VEXA_FORCE_SEED_DEMO: z.string().optional(),
  CI: z.string().optional(),
  // …all known vars
})

export const env = envSchema.parse(process.env)
```

This is invasive — DO NOT migrate every callsite in this task. Just add the module and import it from `instrumentation.ts` to validate at boot. Callsite migration is a follow-up.

Commit: `chore(env): add Zod-validated lib/env.ts; import at boot to fail-fast on invalid env`.

### Task 7 — Troubleshooting + deploy-behind-proxy docs

**Files:** `docs/TROUBLESHOOTING.md`, `docs/DEPLOY-BEHIND-PROXY.md`.

`TROUBLESHOOTING.md` covers: container won't start (most likely cause + check), `better-sqlite3` native build fails on host install (toolchain prerequisites for macOS/Linux/Windows), `SQLITE_BUSY` during heavy ingestion (WAL + `busy_timeout`), IMAP auth fails (TLS, app password, OAuth), "no reports yet" (cron timing, mailbox-empty checklist), install token rotated.

`DEPLOY-BEHIND-PROXY.md` covers: minimal nginx + Caddy config snippets, `VEXA_ALLOW_REMOTE_INSTALL=1` + `VEXA_ALLOWED_ORIGINS` settings, X-Forwarded-* header preservation, sticky-session caveat (single-instance only), TLS termination, healthcheck path.

Commit: `docs: troubleshooting + deploy-behind-proxy`.

### Task 8 — Remove `export *` from `lib/db/index.ts` and `lib/db/schema.ts`

**Files:** `lib/db/index.ts`, `lib/db/schema.ts`.

`lib/db/index.ts` and `lib/db/schema.ts` both use `export * from`. Replace with explicit named re-exports to satisfy the project's own policy.

Commit: `refactor(db): replace 'export *' barrels with explicit named re-exports`.

---

Execute as a single subagent dispatch in the order above. Each task is a separate commit. Stop and report if any task fails type-check / lint / tests; do not proceed to the next task with a red tree.
