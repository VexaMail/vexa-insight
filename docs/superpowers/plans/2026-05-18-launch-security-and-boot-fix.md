# Launch Security + Boot Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolver los 7 launch blockers de seguridad (B1-B7), arreglar el arranque Docker roto, y endurecer el parser DMARC contra zip-bomb / XXE / zip-slip antes de publicar el repo como OSS.

**Architecture:** Tres pilares — (1) un único helper `withApiAuth` aplicado a todos los `/api/v1/**/route.ts` con una allowlist explícita; (2) una primitiva `safeFetch` para outbound con bloqueo de IPs privadas; (3) cifrado at-rest de IMAP passwords con AES-256-GCM derivado del `SECRET_KEY` existente. Todo lo demás (token de install, Origin check, hardening DMARC, scrypt bump) son cambios localizados.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript estricto, better-sqlite3 + Drizzle, `node:crypto` (HKDF, scrypt, AES-GCM), `fast-xml-parser`, `yauzl`, `node:zlib`, Vitest.

---

## Decisions made (lock these in)

1. **B1** — Convertir `/api/v1/**` a default-deny con allowlist explícita. Helper `withApiAuth(handler, { public?: boolean })`. Rutas públicas: `/api/v1/health`, `/api/v1/openapi.json`. El resto exige `requireAdminAccess` (sesión o `x-api-key`).
2. **B3** — Token de install impreso a stdout en arranque cuando `SECRET_KEY === 'CHANGE_ME'`, requerido como header `x-install-token`. Adicionalmente bind loopback-only salvo `VEXA_ALLOW_REMOTE_INSTALL=1`. Mantenemos la UX del web installer pero el formulario pide el token (que el operador copia de `docker logs`).
4. **B4** — Cifrado de passwords IMAP con AES-256-GCM, clave derivada de `SECRET_KEY` vía `crypto.hkdfSync('sha256', secretKey, salt='vexa-imap-pwd', info='v1', 32)`. Formato del campo: `v1:<base64(iv)>|<base64(tag)>|<base64(ct)>` (legacy detectado por ausencia de prefijo `v1:`). Schema sin cambios (TEXT). Migración lazy on-write (no migración masiva; se re-cifra al primer update post-deploy + un migration runner one-shot).
5. **B6** — `services/security/safeFetch.ts` resuelve DNS, rechaza loopback/link-local/private/CGNAT/0.0.0.0/IPv6 equivalentes, exige `http|https`, timeout configurable. Lo aplicamos a `deliverWebhook` y `resolveMtaSts`.
6. **B7** — `services/security/requireSameOrigin.ts` valida `Origin`/`Sec-Fetch-Site` para mutaciones (POST/PUT/PATCH/DELETE) que llevan cookie de sesión. Permite la propia `request.url`'s host. Server actions: confiamos en `next.config.ts` con `experimental.allowedOrigins` (Next 16 nativo).
7. **B5** — `instrumentation.ts:register()` ya corre migrations antes de aceptar tráfico. Simplificamos el `Dockerfile` CMD a `CMD ["node", "server.js"]`. **Más simple que crear `run-migrations.cjs`** y elimina la ruta rota.
8. **DMARC hardening** — `gunzipSync` con `maxOutputLength`; `XMLParser` con `processEntities: false` + rechazo explícito de `<!DOCTYPE`; `processZipEntry` con `path.normalize` check.
9. **Scrypt** — Subir a `N=131072, r=8, p=1, maxmem=64MB`. Hash existing: no migrar (los hashes viejos siguen funcionando hasta el próximo reset de password; documentar en CHANGELOG).
10. **.mcp.json** — Añadir a `.gitignore`, crear `.mcp.example.json` con contenido neutro.

## File structure

### New files
- `services/security/safeFetch.ts` — outbound fetch con SSRF guard
- `services/security/isPrivateIp.ts` — pura, lista CIDR + IPv6
- `services/security/requireSameOrigin.ts` — Origin/Sec-Fetch-Site check
- `services/security/index.ts` — barrel (named re-exports)
- `services/api/withApiAuth.ts` — wrapper Higher-Order para route handlers
- `services/api/publicApiRoutes.ts` — constante allowlist
- `services/crypto/encryptSecret.ts` — AES-GCM con HKDF desde SECRET_KEY
- `services/crypto/decryptSecret.ts`
- `services/crypto/isEncrypted.ts` — detecta prefijo `v1:`
- `services/crypto/index.ts`
- `services/install/installToken.ts` — singleton del token de install
- `services/install/getOrCreateInstallToken.ts`
- `services/install/isLoopbackRequest.ts`
- `.mcp.example.json`
- `test/safeFetch.test.ts`
- `test/isPrivateIp.test.ts`
- `test/encryptSecret.test.ts`
- `test/requireSameOrigin.test.ts`
- `test/withApiAuth.test.ts`
- `test/installToken.test.ts`
- `test/dmarcParserHardening.test.ts`
- `test/fixtures/dmarc/billion-laughs.xml`
- `test/fixtures/dmarc/zip-slip.zip` (generado programáticamente)

### Modified files
- `Dockerfile` — CMD simplificado
- `.gitignore` — añadir `.mcp.json`
- `app/api/install/route.ts` — token + loopback check
- `app/api/install/check/route.ts` — añadir cache header + rate limit
- Cada uno de los **27 route handlers** sin auth bajo `app/api/v1/**` (lista exhaustiva en Task 4)
- `app/api/v1/ai/report-insights/route.ts` — auth + rate limit
- `app/api/v1/ai/diagnostics-insights/route.ts` — auth + rate limit
- `services/auth/createSession.ts` — opcionalmente upgrade `sameSite` a `'strict'` (revisar UX; decisión final en Task 8)
- `services/auth/hashPassword.ts` — params scrypt
- `services/auth/verifyPassword.ts` — params scrypt (mantener compat)
- `services/notifications/deliverWebhook.ts` — usar `safeFetch`
- `services/diagnostics/resolveMtaSts.ts` — usar `safeFetch`
- `services/settings/getImapAccountsRow.ts` — decrypt al leer
- `services/settings/updateSettings.ts` — encrypt al escribir
- `services/settings/getExistingImapPasswords.ts` — devolver encriptado para passthrough
- `app/api/v1/imap/folders/route.ts` — usar password decifrado solo para llamada IMAP, nunca devolver
- `app/api/v1/imap/folders/create/route.ts` — idem
- `app/api/v1/imap/test/route.ts` — idem
- `utils/dmarc/parser.ts` — `processEntities: false`
- `utils/dmarc/parseDmarcXml.ts` — rechazar `<!DOCTYPE` y `<!ENTITY`
- `utils/dmarc/extractXmlFromBuffer.ts` — `gunzipSync({ maxOutputLength })`
- `utils/dmarc/processZipEntry.ts` — `path.normalize` check
- `validators/webhooks/webhookEndpointInputSchema.ts` — exigir scheme http/https
- `config.ts` (raíz) — borrar (dead code)
- `CHANGELOG.md` — sección `[Unreleased] / Security`
- `SECURITY.md` — alinear afirmación "encrypted at rest" con realidad

---

### Task 1: Boot fix — simplify Dockerfile CMD

**Files:**
- Modify: `Dockerfile:41`

- [ ] **Step 1: Verify that instrumentation.ts already runs migrations before serving**

Run: `grep -n 'runMigrations' /Users/cristiandeluxe/p/vexa-insight-dashboard/instrumentation.ts /Users/cristiandeluxe/p/vexa-insight-dashboard/lib/db/runMigrations.ts | head`
Expected: `instrumentation.ts:8: runMigrations()` and the function defined in `lib/db/runMigrations.ts`.

- [ ] **Step 2: Replace the Dockerfile CMD**

Edit `Dockerfile`, change last line from:
```
CMD ["sh", "-c", "node scripts/run-migrations.cjs && node server.js"]
```
to:
```
CMD ["node", "server.js"]
```

- [ ] **Step 3: Build the image and verify health endpoint**

Run:
```bash
docker build -t vexa-boot-test .
docker run -d --name vexa-boot-test \
  -p 13000:3000 \
  -e SECRET_KEY=$(openssl rand -hex 32) \
  vexa-boot-test
sleep 8
curl -fsS http://127.0.0.1:13000/api/v1/health
docker logs vexa-boot-test | grep -i 'migration\|listen\|error' | head -20
docker rm -f vexa-boot-test
docker rmi vexa-boot-test
```
Expected: `curl` returns 200 JSON. Logs show migrations applied. No `scripts/run-migrations.cjs not found` error.

- [ ] **Step 4: Commit**

```bash
git add Dockerfile
git commit -m "fix(docker): drop missing run-migrations.cjs from CMD

Migrations are already executed by instrumentation.ts:register() before
Next.js accepts traffic. The CMD referenced a script that never existed
in scripts/, causing the published image to fail at boot."
```

---

### Task 2: Hardening utilities — isPrivateIp + safeFetch

**Files:**
- Create: `services/security/isPrivateIp.ts`
- Create: `services/security/safeFetch.ts`
- Create: `services/security/index.ts`
- Create: `test/isPrivateIp.test.ts`
- Create: `test/safeFetch.test.ts`

- [ ] **Step 1: Write `test/isPrivateIp.test.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { isPrivateIp } from '../services/security/isPrivateIp'

describe('isPrivateIp', () => {
  const cases: Array<[string, boolean]> = [
    ['127.0.0.1', true],
    ['127.255.255.254', true],
    ['10.0.0.1', true],
    ['10.255.255.255', true],
    ['172.16.0.1', true],
    ['172.31.255.255', true],
    ['172.32.0.1', false],
    ['192.168.0.1', true],
    ['169.254.169.254', true], // AWS metadata
    ['100.64.0.1', true],      // CGNAT
    ['100.127.255.255', true],
    ['0.0.0.0', true],
    ['255.255.255.255', true],
    ['8.8.8.8', false],
    ['1.1.1.1', false],
    ['::1', true],
    ['fe80::1', true],
    ['fc00::1', true],
    ['fd00::abcd', true],
    ['::ffff:127.0.0.1', true],
    ['::ffff:8.8.8.8', false],
    ['2001:4860:4860::8888', false],
  ]
  for (const [ip, expected] of cases) {
    it(`${ip} -> ${expected}`, () => {
      expect(isPrivateIp(ip)).toBe(expected)
    })
  }
})
```

- [ ] **Step 2: Run, expect FAIL**

```bash
pnpm vitest run test/isPrivateIp.test.ts
```
Expected: module not found / function not exported.

- [ ] **Step 3: Implement `services/security/isPrivateIp.ts`**

```ts
import net from 'node:net'

const V4_RANGES: Array<[number, number]> = [
  [0x00_00_00_00, 0x00_FF_FF_FF],         // 0.0.0.0/8
  [0x0A_00_00_00, 0x0A_FF_FF_FF],         // 10/8
  [0x64_40_00_00, 0x64_7F_FF_FF],         // 100.64/10  CGNAT
  [0x7F_00_00_00, 0x7F_FF_FF_FF],         // 127/8
  [0xA9_FE_00_00, 0xA9_FE_FF_FF],         // 169.254/16 link-local
  [0xAC_10_00_00, 0xAC_1F_FF_FF],         // 172.16/12
  [0xC0_00_00_00, 0xC0_00_00_FF],         // 192.0.0/24
  [0xC0_00_02_00, 0xC0_00_02_FF],         // 192.0.2/24 TEST-NET-1
  [0xC0_A8_00_00, 0xC0_A8_FF_FF],         // 192.168/16
  [0xC6_12_00_00, 0xC6_13_FF_FF],         // 198.18/15 benchmarking
  [0xC6_33_64_00, 0xC6_33_64_FF],         // 198.51.100/24 TEST-NET-2
  [0xCB_00_71_00, 0xCB_00_71_FF],         // 203.0.113/24 TEST-NET-3
  [0xE0_00_00_00, 0xFF_FF_FF_FF],         // 224/4 multicast + 240/4 reserved
]

function ipv4ToInt(ip: string): number | null {
  const parts = ip.split('.')
  if (parts.length !== 4) return null
  let acc = 0
  for (const p of parts) {
    const n = Number(p)
    if (!Number.isInteger(n) || n < 0 || n > 255) return null
    acc = (acc * 256 + n) >>> 0
  }
  return acc
}

function isPrivateIpv4(ip: string): boolean {
  const n = ipv4ToInt(ip)
  if (n === null) return false
  return V4_RANGES.some(([lo, hi]) => n >= lo && n <= hi)
}

function isPrivateIpv6(ip: string): boolean {
  const lower = ip.toLowerCase()
  if (lower === '::' || lower === '::1') return true
  if (lower.startsWith('fe80:') || lower.startsWith('fe80::')) return true // link-local
  if (lower.startsWith('fc') || lower.startsWith('fd')) return true        // unique local
  if (lower.startsWith('ff')) return true                                  // multicast
  const mapped = lower.match(/^::ffff:([0-9.]+)$/)
  if (mapped) return isPrivateIpv4(mapped[1])
  return false
}

export function isPrivateIp(ip: string): boolean {
  const v = net.isIP(ip)
  if (v === 4) return isPrivateIpv4(ip)
  if (v === 6) return isPrivateIpv6(ip)
  return false
}
```

- [ ] **Step 4: Run, expect PASS**

```bash
pnpm vitest run test/isPrivateIp.test.ts
```
All cases pass.

- [ ] **Step 5: Write `test/safeFetch.test.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { safeFetch } from '../services/security/safeFetch'

describe('safeFetch', () => {
  it('rejects ftp://', async () => {
    const res = await safeFetch('ftp://example.com/x', { method: 'GET' })
    expect(res.ok).toBe(false)
    expect(res.error?.code).toBe('SCHEME_NOT_ALLOWED')
  })

  it('rejects file://', async () => {
    const res = await safeFetch('file:///etc/passwd', { method: 'GET' })
    expect(res.ok).toBe(false)
  })

  it('rejects literal loopback IPv4', async () => {
    const res = await safeFetch('http://127.0.0.1:80/x', { method: 'GET' })
    expect(res.ok).toBe(false)
    expect(res.error?.code).toBe('PRIVATE_HOST_NOT_ALLOWED')
  })

  it('rejects literal AWS metadata IP', async () => {
    const res = await safeFetch('http://169.254.169.254/latest/', { method: 'GET' })
    expect(res.ok).toBe(false)
    expect(res.error?.code).toBe('PRIVATE_HOST_NOT_ALLOWED')
  })

  it('rejects literal IPv6 loopback', async () => {
    const res = await safeFetch('http://[::1]:80/x', { method: 'GET' })
    expect(res.ok).toBe(false)
  })

  it('accepts a normal public host without dispatching when invoked with allowDispatch=false', async () => {
    const res = await safeFetch('https://api.github.com/zen', {
      method: 'GET',
      allowDispatch: false,
    })
    expect(res.ok).toBe(true)
    expect(res.dispatched).toBe(false)
  })
})
```

`allowDispatch=false` is a dry-run mode used for tests so we don't make network calls. Implementation supports it.

- [ ] **Step 6: Run, expect FAIL**

```bash
pnpm vitest run test/safeFetch.test.ts
```

- [ ] **Step 7: Implement `services/security/safeFetch.ts`**

```ts
import dns from 'node:dns/promises'
import net from 'node:net'
import { isPrivateIp } from './isPrivateIp'

export type SafeFetchError =
  | { code: 'URL_INVALID'; message: string }
  | { code: 'SCHEME_NOT_ALLOWED'; message: string }
  | { code: 'HOSTNAME_INVALID'; message: string }
  | { code: 'DNS_FAILED'; message: string }
  | { code: 'PRIVATE_HOST_NOT_ALLOWED'; message: string }
  | { code: 'TIMEOUT'; message: string }
  | { code: 'NETWORK'; message: string }

export type SafeFetchResult =
  | { ok: true; status: number | null; dispatched: boolean; error: null }
  | { ok: false; status: null; dispatched: boolean; error: SafeFetchError }

interface SafeFetchOptions extends Omit<RequestInit, 'signal'> {
  timeoutMs?: number
  allowDispatch?: boolean // false skips the real fetch (for tests / preflight)
}

const ALLOWED_SCHEMES = new Set(['http:', 'https:'])
const DEFAULT_TIMEOUT_MS = 10_000

export async function safeFetch(
  rawUrl: string,
  options: SafeFetchOptions = {},
): Promise<SafeFetchResult> {
  let url: URL
  try {
    url = new URL(rawUrl)
  } catch {
    return errorResult('URL_INVALID', `Invalid URL: ${rawUrl}`)
  }
  if (!ALLOWED_SCHEMES.has(url.protocol)) {
    return errorResult('SCHEME_NOT_ALLOWED', `Scheme ${url.protocol} not allowed`)
  }
  const host = url.hostname
  if (!host) {
    return errorResult('HOSTNAME_INVALID', 'Empty hostname')
  }

  const stripped = host.replace(/^\[|\]$/g, '') // strip brackets for IPv6
  const isLiteral = net.isIP(stripped) !== 0
  let addresses: string[]
  if (isLiteral) {
    addresses = [stripped]
  } else {
    try {
      const lookups = await dns.lookup(host, { all: true, verbatim: true })
      addresses = lookups.map((l) => l.address)
    } catch (err) {
      return errorResult(
        'DNS_FAILED',
        err instanceof Error ? err.message : 'DNS lookup failed',
      )
    }
  }
  for (const addr of addresses) {
    if (isPrivateIp(addr)) {
      return errorResult(
        'PRIVATE_HOST_NOT_ALLOWED',
        `Host ${host} resolves to private/reserved address ${addr}`,
      )
    }
  }

  const { timeoutMs = DEFAULT_TIMEOUT_MS, allowDispatch = true, ...init } = options
  if (!allowDispatch) {
    return { ok: true, status: null, dispatched: false, error: null }
  }
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(rawUrl, { ...init, signal: controller.signal })
    return { ok: true, status: res.status, dispatched: true, error: null }
  } catch (err) {
    if (controller.signal.aborted) {
      return errorResult('TIMEOUT', `Request timed out after ${timeoutMs}ms`)
    }
    return errorResult(
      'NETWORK',
      err instanceof Error ? err.message : 'Network error',
    )
  } finally {
    clearTimeout(timer)
  }
}

function errorResult(
  code: SafeFetchError['code'],
  message: string,
): SafeFetchResult {
  return { ok: false, status: null, dispatched: false, error: { code, message } }
}
```

- [ ] **Step 8: Create `services/security/index.ts`**

```ts
export { isPrivateIp } from './isPrivateIp'
export { safeFetch } from './safeFetch'
export type { SafeFetchError, SafeFetchResult } from './safeFetch'
```

- [ ] **Step 9: Run tests + typecheck + lint**

```bash
pnpm vitest run test/isPrivateIp.test.ts test/safeFetch.test.ts
pnpm type-check
pnpm lint
```
Expected: PASS. (Network-touching test uses `allowDispatch: false`.)

- [ ] **Step 10: Commit**

```bash
git add services/security test/isPrivateIp.test.ts test/safeFetch.test.ts
git commit -m "feat(security): add SSRF-safe fetch primitive

Adds services/security/{isPrivateIp,safeFetch,index}.ts plus tests.
safeFetch resolves DNS, blocks loopback/link-local/private/CGNAT/
metadata IPv4 and IPv6 ranges, enforces http(s) only, and uses an
AbortController timeout. Used by webhook + MTA-STS dispatch."
```

---

### Task 3: Wire safeFetch into webhook and MTA-STS dispatch (B6)

**Files:**
- Modify: `services/notifications/deliverWebhook.ts`
- Modify: `services/diagnostics/resolveMtaSts.ts`
- Modify: `validators/webhooks/webhookEndpointInputSchema.ts`
- Test: `test/safeFetch.test.ts` (already exists)

- [ ] **Step 1: Tighten webhook schema to http(s) only**

Replace `validators/webhooks/webhookEndpointInputSchema.ts`:
```ts
import { ALL_WEBHOOK_EVENTS } from '@/types/notifications'
import { z } from 'zod'

export const webhookEndpointInputSchema = z.object({
  name: z.string().min(1).max(120),
  url: z
    .url()
    .max(2048)
    .refine(
      (u) => {
        try {
          const p = new URL(u).protocol
          return p === 'https:' || p === 'http:'
        } catch {
          return false
        }
      },
      { message: 'URL must use http or https' },
    ),
  enabled: z.boolean().default(true),
  events: z.array(z.enum(ALL_WEBHOOK_EVENTS as [string, ...string[]])).min(1),
  secret: z.string().min(16).max(256).nullable().optional(),
})
```

- [ ] **Step 2: Rewrite `services/notifications/deliverWebhook.ts` to use safeFetch**

```ts
import { safeFetch } from '@/services/security'
import { DISPATCH_TIMEOUT_MS } from './dispatchTimeoutMs'

export async function deliverWebhook(
  url: string,
  body: string,
  signature: string | null,
): Promise<{ status: number | null; error: string | null }> {
  const headers: Record<string, string> = {
    'content-type': 'application/json',
    'user-agent': 'vexa-mail-insight-webhook/1',
  }
  if (signature) headers['x-vexa-signature'] = signature
  const res = await safeFetch(url, {
    method: 'POST',
    headers,
    body,
    timeoutMs: DISPATCH_TIMEOUT_MS,
  })
  if (!res.ok) {
    return { status: null, error: `${res.error.code}: ${res.error.message}` }
  }
  return {
    status: res.status,
    error:
      res.status !== null && res.status >= 200 && res.status < 300
        ? null
        : `HTTP ${res.status}`,
  }
}
```

- [ ] **Step 3: Patch MTA-STS resolver**

Locate `services/diagnostics/resolveMtaSts.ts` and replace its `fetch(...)` call with `safeFetch(...)`. Validate `domain` against an RFC 1035 hostname regex before constructing the URL:

```ts
import { safeFetch } from '@/services/security'

const HOSTNAME_RE = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i

// ... within resolveMtaSts:
if (!HOSTNAME_RE.test(domain)) {
  return { policy: null, error: 'INVALID_HOSTNAME' }
}
const res = await safeFetch(`https://mta-sts.${domain}/.well-known/mta-sts.txt`, {
  method: 'GET',
  timeoutMs: 5000,
})
if (!res.ok) return { policy: null, error: res.error.code }
```

Adapt to the actual function shape — preserve return type and existing error mapping.

- [ ] **Step 4: Add a regression test for webhook dispatch with private URL**

Append to `test/safeFetch.test.ts`:
```ts
import { deliverWebhook } from '../services/notifications/deliverWebhook'

describe('deliverWebhook (SSRF guard)', () => {
  it('refuses to dispatch to 169.254.169.254', async () => {
    const res = await deliverWebhook(
      'http://169.254.169.254/latest/meta-data/',
      '{}',
      null,
    )
    expect(res.status).toBeNull()
    expect(res.error).toContain('PRIVATE_HOST_NOT_ALLOWED')
  })
})
```

- [ ] **Step 5: Run all checks**

```bash
pnpm vitest run test/safeFetch.test.ts
pnpm type-check && pnpm lint
```

- [ ] **Step 6: Commit**

```bash
git add validators/webhooks services/notifications/deliverWebhook.ts services/diagnostics test/safeFetch.test.ts
git commit -m "feat(security): SSRF-safe webhook and MTA-STS dispatch

deliverWebhook and resolveMtaSts now go through services/security/safeFetch
which blocks loopback, link-local, private, CGNAT and metadata IPs at both
the literal-host and DNS-resolved-address levels. Webhook schema is also
tightened to http(s) only."
```

---

### Task 4: Close /api/v1/** with default-deny auth (B1)

**Files:**
- Create: `services/api/publicApiRoutes.ts`
- Create: `services/api/withApiAuth.ts`
- Create: `test/withApiAuth.test.ts`
- Modify: 27 files under `app/api/v1/**/route.ts` (exhaustive list below)

- [ ] **Step 1: Write `services/api/publicApiRoutes.ts`**

```ts
/**
 * Routes intentionally exposed without authentication.
 * Add new entries here with a justification comment.
 */
export const PUBLIC_API_ROUTES: ReadonlyArray<string> = [
  '/api/v1/health',       // Docker / orchestrator probe
  '/api/v1/openapi.json', // OpenAPI doc — required for client generators
] as const
```

- [ ] **Step 2: Write `test/withApiAuth.test.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { NextResponse } from 'next/server'
import { withApiAuth } from '../services/api/withApiAuth'

function fakeRequest(headers: Record<string, string> = {}) {
  return new Request('http://localhost/api/v1/reports', { headers }) as any
}

describe('withApiAuth', () => {
  it('returns 401 when no session and no api key', async () => {
    const handler = withApiAuth(async () => NextResponse.json({ data: 'secret' }))
    const res = await handler(fakeRequest())
    expect(res.status).toBe(401)
  })

  it('passes through when an api key matching SECRET_KEY is provided', async () => {
    // Stub SECRET_KEY via env or config double — see implementation note.
    // This test verifies that the handler runs when requireAdminAccess returns null.
    // Concrete wiring is exercised in integration tests; here we assert
    // the wrapping behavior by injecting a successful auth function.
    const handler = withApiAuth(
      async () => NextResponse.json({ data: 'ok' }),
      { authFn: async () => null },
    )
    const res = await handler(fakeRequest())
    expect(res.status).toBe(200)
  })
})
```

- [ ] **Step 3: Run, expect FAIL**

```bash
pnpm vitest run test/withApiAuth.test.ts
```

- [ ] **Step 4: Implement `services/api/withApiAuth.ts`**

```ts
import { requireAdminAccess } from './requireAdminAccess'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

type Handler<TArgs extends unknown[]> = (
  request: NextRequest,
  ...args: TArgs
) => Promise<NextResponse> | NextResponse

interface WithApiAuthOptions {
  /** Injection seam for tests. Defaults to requireAdminAccess. */
  authFn?: (req: NextRequest) => Promise<{ status: 401; error: { code: string; message: string } } | null>
}

export function withApiAuth<TArgs extends unknown[]>(
  handler: Handler<TArgs>,
  options: WithApiAuthOptions = {},
): Handler<TArgs> {
  const authFn = options.authFn ?? requireAdminAccess
  return async (request, ...args) => {
    const auth = await authFn(request)
    if (auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }
    return handler(request, ...args)
  }
}
```

- [ ] **Step 5: Run, expect PASS**

```bash
pnpm vitest run test/withApiAuth.test.ts
```

- [ ] **Step 6: Export from `services/api/index.ts`**

Append: `export { withApiAuth } from './withApiAuth'`
Append: `export { PUBLIC_API_ROUTES } from './publicApiRoutes'`

- [ ] **Step 7: Apply `withApiAuth` to every non-public `/api/v1/**/route.ts`**

For each file in the list below, wrap each exported HTTP method (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) with `withApiAuth`. Pattern:

Before:
```ts
export async function GET(request: NextRequest): Promise<NextResponse> {
  // ...
}
```
After:
```ts
import { withApiAuth } from '@/services/api'

export const GET = withApiAuth(async (request: NextRequest): Promise<NextResponse> => {
  // ...
})
```

Use the same pattern for `POST`, etc. Where the handler also receives a route-segment context (e.g. `(request, { params })`), preserve the second arg:
```ts
export const GET = withApiAuth(
  async (
    request: NextRequest,
    context: { params: Promise<{ reportId: string }> },
  ): Promise<NextResponse> => {
    const { reportId } = await context.params
    // ...
  },
)
```

**Exhaustive list of files to modify in this task (skip the two already-public ones — `health` and `openapi.json`):**

```
app/api/v1/domains/route.ts
app/api/v1/poll-status/route.ts
app/api/v1/stats/route.ts
app/api/v1/reports/route.ts
app/api/v1/reports/org-options/route.ts
app/api/v1/reports/domain-options/route.ts
app/api/v1/reports/ids/route.ts
app/api/v1/reports/[reportId]/route.ts
app/api/v1/reports/upload/route.ts
app/api/v1/processed-messages/content/route.ts
app/api/v1/stats/top-ips/route.ts
app/api/v1/stats/trend/route.ts
app/api/v1/stats/by-org/route.ts
app/api/v1/stats/spf-dkim/route.ts
app/api/v1/job-runs/[id]/poll-status/route.ts
app/api/v1/domains/[domainId]/route.ts
app/api/v1/domains/ids/route.ts
app/api/v1/domains/summary/route.ts
app/api/v1/geoip/enrich/route.ts
app/api/v1/domains/[domainId]/sources/route.ts
app/api/v1/domains/[domainId]/dns/route.ts
app/api/v1/domains/[domainId]/stats/route.ts
app/api/v1/domains/[domainId]/reports/route.ts
app/api/v1/ips/[ip]/hostname/route.ts
app/api/v1/ips/[ip]/hostname/refresh/route.ts
app/api/v1/metrics/route.ts        # see note: keep auth; optional public flag in Task 4b
```

NB: `/api/v1/admin/**` routes already use `requireAdminAuth` (token only, no session). Leave them alone — they're hardened differently. AI routes are handled in Task 5.

- [ ] **Step 8: Add an end-to-end smoke test asserting closure**

Create `test/apiAuthSmoke.test.ts`:
```ts
import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = path.join(dir, entry)
    const s = statSync(p)
    if (s.isDirectory()) walk(p, out)
    else if (p.endsWith('route.ts')) out.push(p)
  }
  return out
}

describe('every /api/v1/** route handler enforces auth', () => {
  const publicAllow = new Set([
    'app/api/v1/health/route.ts',
    'app/api/v1/openapi.json/route.ts',
  ])
  const routes = walk(path.resolve(__dirname, '../app/api/v1'))
  for (const file of routes) {
    const rel = path.relative(path.resolve(__dirname, '..'), file)
    if (publicAllow.has(rel)) continue
    it(rel, () => {
      const src = readFileSync(file, 'utf8')
      const hasAuth =
        src.includes('withApiAuth(') ||
        src.includes('requireAdminAuth(') ||
        src.includes('requireAdminAccess(')
      expect(hasAuth, `${rel} must use withApiAuth / requireAdminAuth / requireAdminAccess`).toBe(true)
    })
  }
})
```

- [ ] **Step 9: Run the smoke test until green**

```bash
pnpm vitest run test/apiAuthSmoke.test.ts
```
If any route is missing auth, add `withApiAuth` to it and re-run.

- [ ] **Step 10: Remove `/api/v1` from `utils/proxy/publicRoutes.ts`**

Edit:
```ts
export const publicRoutes = [
  '/login',
  '/docs',
  // '/api/v1' removed — auth is enforced at route handler level via withApiAuth
  '/_next',
  '/favicon.ico',
]
```
This is cosmetic since the proxy `matcher` already excludes `/api`, but keeping the entry was misleading.

- [ ] **Step 11: Full check**

```bash
pnpm type-check && pnpm lint && pnpm test
```

- [ ] **Step 12: Commit**

```bash
git add services/api app/api/v1 utils/proxy/publicRoutes.ts test/withApiAuth.test.ts test/apiAuthSmoke.test.ts
git commit -m "feat(security): default-deny auth for /api/v1/** (B1)

Wraps every non-explicitly-public route handler with withApiAuth(),
which delegates to requireAdminAccess (session OR x-api-key).

Public allowlist: /api/v1/health, /api/v1/openapi.json.
Admin token-only routes under /api/v1/admin/** keep requireAdminAuth.

Adds a structural test (apiAuthSmoke) that fails the build if a new
route is added without auth. Closes B1 from the OSS launch audit."
```

---

### Task 5: AI endpoints — auth + strict rate limit (B2)

**Files:**
- Modify: `app/api/v1/ai/report-insights/route.ts`
- Modify: `app/api/v1/ai/diagnostics-insights/route.ts`

- [ ] **Step 1: Wrap report-insights**

Replace `app/api/v1/ai/report-insights/route.ts`:

```ts
import type { AIServiceError } from '@/services/ai'
import { generateReportInsights } from '@/services/ai'
import { withApiAuth } from '@/services/api'
import { checkRateLimit, getRateLimitKey } from '@/utils/rateLimit'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const AI_LIMIT = 10
const AI_WINDOW_MS = 60_000

export const POST = withApiAuth(async (request: NextRequest): Promise<NextResponse> => {
  const key = `ai:${getRateLimitKey(request)}`
  if (!checkRateLimit(key, AI_LIMIT, AI_WINDOW_MS)) {
    return NextResponse.json(
      { error: { code: 'TOO_MANY_REQUESTS', message: 'AI rate limit exceeded' } },
      { status: 429 },
    )
  }
  try {
    const body = (await request.json()) as { reportId?: number }
    const reportId = body.reportId
    if (!reportId || typeof reportId !== 'number' || reportId < 1) {
      return NextResponse.json(
        { error: { code: 'INVALID_INPUT', message: 'Valid reportId is required.' } },
        { status: 400 },
      )
    }
    const result = await generateReportInsights({ reportId })
    return NextResponse.json({ data: result })
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err) {
      const aiError = err as AIServiceError
      const statusMap: Record<string, number> = {
        NOT_CONFIGURED: 422,
        UNAUTHORIZED: 401,
        RATE_LIMITED: 429,
        PROVIDER_UNAVAILABLE: 503,
        TIMEOUT: 504,
        MALFORMED_RESPONSE: 502,
        INSUFFICIENT_DATA: 422,
        UNKNOWN: 500,
      }
      const status = statusMap[aiError.code] ?? 500
      return NextResponse.json(
        { error: { code: aiError.code, message: aiError.message } },
        { status },
      )
    }
    console.error('[ai/report-insights] Unexpected error:', err)
    return NextResponse.json(
      { error: { code: 'UNKNOWN', message: 'An unexpected error occurred.' } },
      { status: 500 },
    )
  }
})
```

- [ ] **Step 2: Apply the same wrapper to diagnostics-insights**

Edit `app/api/v1/ai/diagnostics-insights/route.ts` the same way: import `withApiAuth` + rate limit at the top of the handler. Use a separate rate-limit key prefix `ai-diag:`.

- [ ] **Step 3: Verify with the structural test**

```bash
pnpm vitest run test/apiAuthSmoke.test.ts
```

- [ ] **Step 4: Commit**

```bash
git add app/api/v1/ai
git commit -m "feat(security): require auth and rate-limit AI endpoints (B2)

POST /api/v1/ai/report-insights and /api/v1/ai/diagnostics-insights now
require requireAdminAccess (session or x-api-key) and 10/min/IP rate
limit. Without this, an anonymous client could drain the operator's
LLM credits and read summarized report content."
```

---

### Task 6: Install token + loopback default (B3)

**Files:**
- Create: `services/install/installToken.ts`
- Create: `services/install/getOrCreateInstallToken.ts`
- Create: `services/install/isLoopbackRequest.ts`
- Create: `test/installToken.test.ts`
- Modify: `instrumentation.ts` (print token at boot)
- Modify: `app/api/install/route.ts`
- Modify: `app/api/install/check/route.ts` (expose `requiresToken: boolean`)
- Modify: any client install form to read the token from the user — call this out as a TODO follow-up; **server-side enforcement is the launch blocker**.

- [ ] **Step 1: Write `services/install/installToken.ts`**

```ts
import crypto from 'node:crypto'

let token: string | null = null

export function generateInstallToken(): string {
  return crypto.randomBytes(24).toString('hex')
}

export function setInstallTokenForBoot(value: string): void {
  token = value
}

export function getInstallToken(): string | null {
  return token
}

export function clearInstallToken(): void {
  token = null
}
```

- [ ] **Step 2: Write `services/install/getOrCreateInstallToken.ts`**

```ts
import { generateInstallToken, getInstallToken, setInstallTokenForBoot } from './installToken'
import { isInstalled } from './isInstalled'

export function getOrCreateInstallToken(): string | null {
  if (isInstalled()) return null
  const existing = getInstallToken()
  if (existing) return existing
  const fresh = generateInstallToken()
  setInstallTokenForBoot(fresh)
  return fresh
}
```

- [ ] **Step 3: Write `services/install/isLoopbackRequest.ts`**

```ts
import type { NextRequest } from 'next/server'

const LOOPBACK_HOSTS = new Set([
  'localhost',
  '127.0.0.1',
  '::1',
  '0.0.0.0', // some compose setups
])

export function isLoopbackRequest(request: NextRequest | Request): boolean {
  try {
    const url = new URL(request.url)
    const host = url.hostname.replace(/^\[|\]$/g, '')
    return LOOPBACK_HOSTS.has(host)
  } catch {
    return false
  }
}
```

- [ ] **Step 4: Write `test/installToken.test.ts`**

```ts
import { afterEach, describe, expect, it } from 'vitest'
import {
  clearInstallToken,
  generateInstallToken,
  getInstallToken,
  setInstallTokenForBoot,
} from '../services/install/installToken'

afterEach(() => clearInstallToken())

describe('installToken', () => {
  it('generates a 48-hex-char token', () => {
    const t = generateInstallToken()
    expect(t).toMatch(/^[0-9a-f]{48}$/)
  })

  it('persists for the lifetime of the process', () => {
    setInstallTokenForBoot('abc')
    expect(getInstallToken()).toBe('abc')
  })

  it('clears on demand', () => {
    setInstallTokenForBoot('xyz')
    clearInstallToken()
    expect(getInstallToken()).toBeNull()
  })
})
```

- [ ] **Step 5: Run, expect PASS after creating files**

```bash
pnpm vitest run test/installToken.test.ts
```

- [ ] **Step 6: Update `instrumentation.ts` to print the token on first boot**

Replace:
```ts
export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  const { runMigrations } = await import('@/lib/db')
  runMigrations()

  const { isInstalled, getOrCreateInstallToken } = await import('@/services/install')
  if (!isInstalled()) {
    const token = getOrCreateInstallToken()
    if (token) {
      // eslint-disable-next-line no-console
      console.warn(
        `\n========================================\n` +
        `Vexa first-run install token:\n  ${token}\n` +
        `Pass this token to POST /api/install as either the\n` +
        `'x-install-token' header or 'installToken' body field.\n` +
        `Re-displayed on every boot until installation completes.\n` +
        `========================================\n`,
      )
    }
  }

  const { startScheduler } = await import('@/services/job')
  try {
    startScheduler()
  } catch {
    // Not installed yet (no app_settings row or secret_key still CHANGE_ME); skip scheduler
  }

  const { startUpdateCheckScheduler } = await import('@/services/updates')
  try {
    startUpdateCheckScheduler()
  } catch (err) {
    console.warn('[update-check] failed to start scheduler', err)
  }
}
```

Add the export from `services/install/index.ts`:
```ts
export { getOrCreateInstallToken } from './getOrCreateInstallToken'
export { isLoopbackRequest } from './isLoopbackRequest'
export { clearInstallToken } from './installToken'
```

- [ ] **Step 7: Patch `app/api/install/route.ts` to require token + loopback**

```ts
import { runMigrations } from '@/lib/db'
import {
  clearInstallToken,
  completeInstall,
  getOrCreateInstallToken,
  isInstalled,
  isLoopbackRequest,
} from '@/services/install'
import { isPartiallyInstalled } from '@/services/install/isPartiallyInstalled'
import { validateInstallBody } from '@/utils/install'
import { NextResponse } from 'next/server'
import crypto from 'node:crypto'

const ALLOW_REMOTE = process.env.VEXA_ALLOW_REMOTE_INSTALL === '1'

function timingSafeStringEqual(a: string, b: string): boolean {
  const A = Buffer.from(a)
  const B = Buffer.from(b)
  if (A.length !== B.length) return false
  return crypto.timingSafeEqual(A, B)
}

export async function POST(
  request: Request,
): Promise<NextResponse> {
  runMigrations()
  if (isInstalled()) {
    return NextResponse.json(
      { error: { code: 'FORBIDDEN', message: 'Already installed' } },
      { status: 403 },
    )
  }
  if (!ALLOW_REMOTE && !isLoopbackRequest(request)) {
    return NextResponse.json(
      {
        error: {
          code: 'FORBIDDEN',
          message:
            'Install is restricted to loopback. Set VEXA_ALLOW_REMOTE_INSTALL=1 to allow remote install, or reach the installer via 127.0.0.1.',
        },
      },
      { status: 403 },
    )
  }
  const expectedToken = getOrCreateInstallToken()
  if (!expectedToken) {
    return NextResponse.json(
      { error: { code: 'CONFLICT', message: 'Install already complete' } },
      { status: 409 },
    )
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: 'Invalid JSON' } },
      { status: 400 },
    )
  }
  const headerToken = request.headers.get('x-install-token')
  const bodyToken =
    typeof body === 'object' && body !== null && 'installToken' in body
      ? String((body as Record<string, unknown>).installToken ?? '')
      : ''
  const provided = headerToken ?? bodyToken
  if (!provided || !timingSafeStringEqual(provided, expectedToken)) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Invalid install token' } },
      { status: 401 },
    )
  }
  const isPartial = isPartiallyInstalled()
  const result = validateInstallBody(body, isPartial)
  if (!result.ok) {
    return NextResponse.json(
      { error: { code: 'BAD_REQUEST', message: result.message } },
      { status: 400 },
    )
  }
  await completeInstall(result.payload, isPartial)
  clearInstallToken()
  return NextResponse.json({ data: { redirect: '/settings' } })
}
```

- [ ] **Step 8: Update `app/api/install/check/route.ts` to expose `requiresToken`**

```ts
import { getOrCreateInstallToken, isInstalled } from '@/services/install'
import { NextResponse } from 'next/server'

export async function GET(): Promise<
  NextResponse<{ data: { installed: boolean; requiresToken: boolean } }>
> {
  const installed = isInstalled()
  // Eagerly create the token so it's printed on first GET if not already.
  if (!installed) {
    getOrCreateInstallToken()
  }
  return NextResponse.json({
    data: { installed, requiresToken: !installed },
  })
}
```

- [ ] **Step 9: Document the new flow in `.env.example`**

Append:
```
# --- Install ---
# Restrict install to loopback (127.0.0.1) by default. Set to "1" to allow
# install from any origin (NOT recommended for fresh deploys reachable
# from the public internet).
# VEXA_ALLOW_REMOTE_INSTALL="0"
```

- [ ] **Step 10: Document in CHANGELOG + SECURITY.md**

Add an `[Unreleased] / Security` entry:
```
- Install endpoint now requires a one-time token printed to server logs on
  first boot and is restricted to loopback unless VEXA_ALLOW_REMOTE_INSTALL=1.
  Prevents the race window where the first network caller becomes admin.
```

Update SECURITY.md "Install bootstrap" section to describe the new token flow.

- [ ] **Step 11: Manual smoke test**

```bash
rm -rf data/vexa-test.db
DATABASE_URL=file:./data/vexa-test.db pnpm next start &
sleep 5
# expect 401 because no token provided
curl -sf -X POST http://127.0.0.1:3000/api/install -H 'content-type: application/json' -d '{"adminEmail":"a@b.c","adminPassword":"abcdef12","secretKey":"<32+ chars>"}' || echo "OK 401 as expected"
# read token from server logs, then re-curl with header
kill %1
```

- [ ] **Step 12: Commit**

```bash
git add services/install instrumentation.ts app/api/install .env.example CHANGELOG.md SECURITY.md test/installToken.test.ts
git commit -m "feat(security): install token + loopback default (B3)

POST /api/install now requires a one-time token printed to stdout on
first boot, and refuses non-loopback requests unless the new env var
VEXA_ALLOW_REMOTE_INSTALL=1 is set.

Closes the bootstrap-race window where any network caller could
register the first admin user before the operator opened the UI."
```

---

### Task 7: IMAP password encryption at rest (B4)

**Files:**
- Create: `services/crypto/deriveEncryptionKey.ts`
- Create: `services/crypto/encryptSecret.ts`
- Create: `services/crypto/decryptSecret.ts`
- Create: `services/crypto/isEncrypted.ts`
- Create: `services/crypto/index.ts`
- Create: `test/encryptSecret.test.ts`
- Modify: `services/settings/getImapAccountsRow.ts` (decrypt on read)
- Modify: `services/settings/updateSettings.ts` (encrypt on write)
- Modify: `services/settings/getExistingImapPasswords.ts` (return encrypted blob, callers pass-through)
- Modify: `app/api/v1/imap/folders/route.ts`, `imap/folders/create/route.ts`, `imap/test/route.ts` — never return password fields
- Modify: any other path that emits an IMAP account shape with `password` — drop the field

- [ ] **Step 1: Write `test/encryptSecret.test.ts`**

```ts
import { describe, expect, it } from 'vitest'
import {
  decryptSecret,
  encryptSecret,
  isEncrypted,
} from '../services/crypto'

const SECRET = 'this-is-a-32-character-test-key-AA'

describe('encryptSecret / decryptSecret', () => {
  it('round-trips a plain string', () => {
    const ct = encryptSecret('hunter2', SECRET)
    expect(ct).toMatch(/^v1:/)
    expect(decryptSecret(ct, SECRET)).toBe('hunter2')
  })

  it('produces different ciphertexts for the same plaintext (random IV)', () => {
    const a = encryptSecret('same', SECRET)
    const b = encryptSecret('same', SECRET)
    expect(a).not.toBe(b)
  })

  it('detects encrypted vs plain', () => {
    expect(isEncrypted('v1:abc|def|ghi')).toBe(true)
    expect(isEncrypted('hunter2')).toBe(false)
    expect(isEncrypted('')).toBe(false)
  })

  it('throws on tampered ciphertext', () => {
    const ct = encryptSecret('hunter2', SECRET)
    const parts = ct.split(':')[1].split('|')
    parts[2] = Buffer.from('zzzzzzzz').toString('base64')
    const tampered = 'v1:' + parts.join('|')
    expect(() => decryptSecret(tampered, SECRET)).toThrow()
  })

  it('treats already-encrypted blobs as passthrough when re-encrypted by the writer logic', () => {
    const ct = encryptSecret('hunter2', SECRET)
    expect(isEncrypted(ct)).toBe(true)
  })
})
```

- [ ] **Step 2: Run, expect FAIL**

```bash
pnpm vitest run test/encryptSecret.test.ts
```

- [ ] **Step 3: Implement `services/crypto/deriveEncryptionKey.ts`**

```ts
import crypto from 'node:crypto'

const SALT = 'vexa-imap-pwd-v1'

export function deriveEncryptionKey(secretKey: string): Buffer {
  if (!secretKey || secretKey.length < 16) {
    throw new Error('SECRET_KEY too short to derive encryption key (min 16)')
  }
  return Buffer.from(
    crypto.hkdfSync('sha256', Buffer.from(secretKey), Buffer.from(SALT), Buffer.from('aes-gcm'), 32),
  )
}
```

- [ ] **Step 4: Implement `services/crypto/encryptSecret.ts`**

```ts
import crypto from 'node:crypto'
import { deriveEncryptionKey } from './deriveEncryptionKey'

const PREFIX = 'v1:'

export function encryptSecret(plaintext: string, secretKey: string): string {
  if (plaintext.length === 0) return ''
  const key = deriveEncryptionKey(secretKey)
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const ct = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return (
    PREFIX +
    [iv.toString('base64'), tag.toString('base64'), ct.toString('base64')].join('|')
  )
}
```

- [ ] **Step 5: Implement `services/crypto/decryptSecret.ts`**

```ts
import crypto from 'node:crypto'
import { deriveEncryptionKey } from './deriveEncryptionKey'

const PREFIX = 'v1:'

export function decryptSecret(blob: string, secretKey: string): string {
  if (!blob) return ''
  if (!blob.startsWith(PREFIX)) return blob // legacy plaintext passthrough during migration
  const [ivB64, tagB64, ctB64] = blob.slice(PREFIX.length).split('|')
  if (!ivB64 || !tagB64 || !ctB64) {
    throw new Error('Malformed encrypted blob')
  }
  const key = deriveEncryptionKey(secretKey)
  const iv = Buffer.from(ivB64, 'base64')
  const tag = Buffer.from(tagB64, 'base64')
  const ct = Buffer.from(ctB64, 'base64')
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  const pt = Buffer.concat([decipher.update(ct), decipher.final()])
  return pt.toString('utf8')
}
```

- [ ] **Step 6: Implement `services/crypto/isEncrypted.ts`**

```ts
export function isEncrypted(value: string): boolean {
  return typeof value === 'string' && value.startsWith('v1:') && value.split('|').length === 3
}
```

- [ ] **Step 7: Create `services/crypto/index.ts`**

```ts
export { decryptSecret } from './decryptSecret'
export { encryptSecret } from './encryptSecret'
export { isEncrypted } from './isEncrypted'
```

- [ ] **Step 8: Run encrypt tests, expect PASS**

```bash
pnpm vitest run test/encryptSecret.test.ts
```

- [ ] **Step 9: Wire decryption into `services/settings/getImapAccountsRow.ts`**

Replace the file:
```ts
import { getDb, imapAccounts } from '@/lib/db'
import { decryptSecret } from '@/services/crypto'
import { getConfig } from '@/services/config'
import { asc } from 'drizzle-orm'
import type { ImapAccountRow } from './ImapAccountRow'

function getImapAccountsRow(): ImapAccountRow[] {
  const db = getDb()
  const config = getConfig()
  const rows = db
    .select()
    .from(imapAccounts)
    .orderBy(asc(imapAccounts.sortOrder))
    .all()
  return rows.map((r) => ({
    id: r.id,
    label: r.label,
    server: r.server,
    port: r.port,
    username: r.username,
    password: r.password ? decryptSecret(r.password, config.secretKey) : '',
    sortOrder: r.sortOrder,
    fetchIncludeTrash: r.fetchIncludeTrash,
    fetchIncludeAllFolders: r.fetchIncludeAllFolders,
    postProcessAction: r.postProcessAction,
    postProcessFolder: r.postProcessFolder,
    moveToTrashAfterProcess: r.moveToTrashAfterProcess,
    markAsReadAfterProcess: r.markAsReadAfterProcess,
  }))
}

export { getImapAccountsRow }
```

- [ ] **Step 10: Wire encryption into `services/settings/updateSettings.ts`**

Locate the IMAP-accounts insert/update branch (the section starting `payload.imapAccounts.forEach((acc, index) => { ...`) and ensure the password being written is encrypted. The existing `getExistingImapPasswords` returns whatever is in the DB (could be plaintext legacy or already-encrypted). New logic:

```ts
import { encryptSecret, isEncrypted } from '@/services/crypto'

// inside the loop where the row is upserted:
const secretKey = payload.secretKey ?? // ... derive from existing settings if not provided
  // fallback to currently configured secret — wire from getConfig() at the top of the function
let storedPassword: string
if (acc.password && acc.password.length > 0) {
  // operator changed it
  storedPassword = encryptSecret(acc.password, secretKey)
} else if (acc.id != null && passwordsById.has(acc.id)) {
  // keep existing (already encrypted in DB)
  const existing = passwordsById.get(acc.id)!
  storedPassword = isEncrypted(existing)
    ? existing
    : encryptSecret(existing, secretKey)
}
// then use storedPassword in the row write
```

**Critical detail:** the function currently uses `payload.secretKey` only when truthy. We need an authoritative secret. Add at the top of `updateSettings`:
```ts
import { getConfig } from '@/services/config'
// ...
const secretKey =
  (payload.secretKey ?? '').trim() !== ''
    ? payload.secretKey!
    : getConfig().secretKey
if (!secretKey) {
  throw new Error('SECRET_KEY not configured; cannot encrypt IMAP passwords')
}
```

Refactor `getExistingImapPasswords(db)` to return `Map<number, string>` if it doesn't already (read its current implementation; adapt accordingly).

- [ ] **Step 11: Stop reflecting passwords in IMAP API responses**

In `app/api/v1/imap/folders/route.ts`, the local `account: ImapAccountConfig` is built from the decrypted row and used for the IMAP call. The response body returns folder metadata only. **Verify** no path in this file returns `password`. Apply the same audit to:
- `app/api/v1/imap/folders/create/route.ts`
- `app/api/v1/imap/test/route.ts`
- `services/settings/getSettingsForAdmin.ts`

`getSettingsPublic.ts` already returns `passwordMasked: boolean` — that pattern is correct. Replicate for `getSettingsForAdmin.ts` if it currently returns the password.

- [ ] **Step 12: Add a one-shot migration runner that encrypts plaintext rows**

Create `services/settings/encryptLegacyImapPasswords.ts`:
```ts
import { getDb, imapAccounts } from '@/lib/db'
import { getConfig } from '@/services/config'
import { encryptSecret, isEncrypted } from '@/services/crypto'
import { eq } from 'drizzle-orm'

export function encryptLegacyImapPasswords(): { migrated: number } {
  const db = getDb()
  const rows = db.select().from(imapAccounts).all()
  const secret = getConfig().secretKey
  if (!secret) return { migrated: 0 }
  let migrated = 0
  for (const row of rows) {
    if (!row.password) continue
    if (isEncrypted(row.password)) continue
    const ct = encryptSecret(row.password, secret)
    db.update(imapAccounts).set({ password: ct }).where(eq(imapAccounts.id, row.id)).run()
    migrated++
  }
  return { migrated }
}
```

Call it from `instrumentation.ts:register()` AFTER `runMigrations()` AND only when installed:
```ts
const { isInstalled } = await import('@/services/install')
if (isInstalled()) {
  const { encryptLegacyImapPasswords } = await import('@/services/settings/encryptLegacyImapPasswords')
  const { migrated } = encryptLegacyImapPasswords()
  if (migrated > 0) console.info(`[crypto] migrated ${migrated} legacy IMAP passwords to v1 encryption`)
}
```

- [ ] **Step 13: Update SECURITY.md to truthfully describe the storage**

Replace the affirmative "stored encrypted at rest" line with an accurate description that mentions: AES-256-GCM, key derived from SECRET_KEY via HKDF, automatic migration from legacy plaintext on first boot post-upgrade.

- [ ] **Step 14: Add CHANGELOG entry under [Unreleased] / Security**

```
- IMAP credentials are now encrypted at rest (AES-256-GCM with a key derived
  from SECRET_KEY via HKDF). Legacy plaintext rows are migrated automatically
  on first boot after upgrade.
```

- [ ] **Step 15: Full check**

```bash
pnpm type-check && pnpm lint && pnpm test
```

- [ ] **Step 16: Commit**

```bash
git add services/crypto services/settings test/encryptSecret.test.ts instrumentation.ts app/api/v1/imap CHANGELOG.md SECURITY.md
git commit -m "feat(security): encrypt IMAP credentials at rest (B4)

Adds AES-256-GCM encryption with HKDF-derived key from SECRET_KEY.
- Encrypts on write (updateSettings); decrypts on read (getImapAccountsRow)
- Legacy plaintext rows migrated on boot via encryptLegacyImapPasswords
- IMAP API routes no longer reflect password fields in responses
- SECURITY.md description aligned with implementation

Without this, a leaked SQLite backup equals all configured IMAP mailbox
passwords. Closes B4 from the OSS launch audit."
```

---

### Task 8: CSRF — Same-origin check on mutating session-cookie routes (B7)

**Files:**
- Create: `services/security/requireSameOrigin.ts`
- Create: `test/requireSameOrigin.test.ts`
- Modify: `services/auth/createSession.ts` (consider `sameSite: 'strict'` upgrade — see step 5)
- Modify: every non-GET handler under `app/api/v1/**` that consumes the session cookie (in practice: `/api/v1/admin/webhooks/**`, `/api/v1/users/**`, `/api/v1/admin/settings`, etc.)
- Modify: `next.config.ts` — set `experimental.allowedOrigins` for server actions (Next 16)

Lazy approach: wire the origin check inside `withApiAuth` so every wrapped non-GET handler gets it for free.

- [ ] **Step 1: Write `test/requireSameOrigin.test.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { requireSameOrigin } from '../services/security/requireSameOrigin'

function req(method: string, headers: Record<string, string>): Request {
  return new Request('https://vexa.example.com/api/v1/users', { method, headers }) as any
}

describe('requireSameOrigin', () => {
  it('passes GET unconditionally', () => {
    expect(requireSameOrigin(req('GET', {}))).toBeNull()
  })

  it('rejects POST with no Origin and no Sec-Fetch-Site', () => {
    expect(requireSameOrigin(req('POST', {}))?.status).toBe(403)
  })

  it('passes POST with Sec-Fetch-Site: same-origin', () => {
    expect(requireSameOrigin(req('POST', { 'sec-fetch-site': 'same-origin' }))).toBeNull()
  })

  it('passes POST with Origin matching host', () => {
    expect(requireSameOrigin(req('POST', { origin: 'https://vexa.example.com' }))).toBeNull()
  })

  it('rejects POST with foreign Origin', () => {
    expect(requireSameOrigin(req('POST', { origin: 'https://evil.example.com' }))?.status).toBe(403)
  })

  it('rejects POST with Sec-Fetch-Site: cross-site', () => {
    expect(requireSameOrigin(req('POST', { 'sec-fetch-site': 'cross-site' }))?.status).toBe(403)
  })
})
```

- [ ] **Step 2: Implement `services/security/requireSameOrigin.ts`**

```ts
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])

export function requireSameOrigin(
  request: Request,
): { status: 403; error: { code: string; message: string } } | null {
  if (SAFE_METHODS.has(request.method.toUpperCase())) return null
  const site = request.headers.get('sec-fetch-site')
  if (site === 'same-origin' || site === 'same-site' || site === 'none') return null
  const origin = request.headers.get('origin')
  if (origin) {
    try {
      const reqUrl = new URL(request.url)
      const o = new URL(origin)
      if (o.host === reqUrl.host) return null
    } catch {
      // fall through to reject
    }
  }
  return {
    status: 403,
    error: {
      code: 'CSRF_REJECTED',
      message: 'Cross-origin or missing-origin request rejected for mutating endpoint',
    },
  }
}
```

Export from `services/security/index.ts`.

- [ ] **Step 3: Plug into `withApiAuth`**

Edit `services/api/withApiAuth.ts`:
```ts
import { requireSameOrigin } from '@/services/security'

// inside the wrapper, BEFORE authFn:
const origin = requireSameOrigin(request)
if (origin) {
  return NextResponse.json({ error: origin.error }, { status: origin.status })
}
```

Add a unit test asserting the wrapper rejects a cross-origin POST.

- [ ] **Step 4: Configure server-action origins**

Edit `next.config.ts`:
```ts
const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  serverExternalPackages: ['geoip-lite'],
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  experimental: {
    serverActions: {
      allowedOrigins: (process.env.VEXA_ALLOWED_ORIGINS ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    },
  },
  // ...
}
```

Document `VEXA_ALLOWED_ORIGINS` in `.env.example` (e.g. `https://dmarc.example.com`).

- [ ] **Step 5: Decide on cookie SameSite**

Read `services/auth/createSession.ts` and decide between:
- Keep `sameSite: 'lax'` + rely on Origin check + server-action allowedOrigins (recommended; preserves bookmarkable login).
- Upgrade to `sameSite: 'strict'` (breaks email-link-to-app flows; less needed now).

Pick option A. Document the rationale as a comment in `createSession.ts`.

- [ ] **Step 6: Full check**

```bash
pnpm type-check && pnpm lint && pnpm test
```

- [ ] **Step 7: Commit**

```bash
git add services/security services/api/withApiAuth.ts next.config.ts services/auth/createSession.ts test/requireSameOrigin.test.ts .env.example
git commit -m "feat(security): CSRF same-origin guard (B7)

Adds requireSameOrigin (checks Sec-Fetch-Site / Origin), invoked from
withApiAuth before authentication. Configures Next 16 server-action
allowedOrigins via the new VEXA_ALLOWED_ORIGINS env var.

Closes B7 from the OSS launch audit."
```

---

### Task 9: DMARC parser hardening (gzip cap, XML entities, zip-slip)

**Files:**
- Modify: `utils/dmarc/extractXmlFromBuffer.ts`
- Modify: `utils/dmarc/parser.ts`
- Modify: `utils/dmarc/parseDmarcXml.ts`
- Modify: `utils/dmarc/processZipEntry.ts`
- Create: `test/dmarcParserHardening.test.ts`
- Create: `test/fixtures/dmarc/billion-laughs.xml`

- [ ] **Step 1: Create billion-laughs fixture**

`test/fixtures/dmarc/billion-laughs.xml`:
```xml
<?xml version="1.0"?>
<!DOCTYPE lolz [
  <!ENTITY lol "lol">
  <!ENTITY lol2 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
]>
<feedback>
  <report_metadata><report_id>&lol2;</report_id></report_metadata>
</feedback>
```

- [ ] **Step 2: Write `test/dmarcParserHardening.test.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { gzipSync } from 'node:zlib'
import { extractXmlFromBuffer } from '../utils/dmarc/extractXmlFromBuffer'
import { parseDmarcXml } from '../utils/dmarc/parseDmarcXml'

const FIXTURE_DIR = path.join(__dirname, 'fixtures', 'dmarc')

describe('DMARC parser hardening', () => {
  it('refuses XML with DOCTYPE', () => {
    const xml = readFileSync(path.join(FIXTURE_DIR, 'billion-laughs.xml'))
    expect(() => parseDmarcXml(xml)).toThrow(/DOCTYPE/)
  })

  it('caps gunzip output size', async () => {
    // 5 KB of 'A' compresses to ~50 bytes; gunzip cap is the post-decompression length
    const huge = Buffer.alloc(200 * 1024 * 1024, 0x41) // 200 MB — exceeds cap
    const gzipped = gzipSync(huge)
    const out = await extractXmlFromBuffer(gzipped, 'big.xml.gz')
    expect(out).toBeNull()
  })
})
```

- [ ] **Step 3: Run, expect FAIL**

```bash
pnpm vitest run test/dmarcParserHardening.test.ts
```

- [ ] **Step 4: Patch `utils/dmarc/extractXmlFromBuffer.ts`**

```ts
import { gunzipSync } from 'node:zlib'
import { MAX_UNCOMPRESSED_SIZE } from './constants'
import { extractXmlFromZip } from './extractXmlFromZip'

export async function extractXmlFromBuffer(
  fileContent: Buffer,
  filename: string,
): Promise<Buffer | null> {
  const lower = filename.toLowerCase()
  if (lower.endsWith('.zip')) {
    return extractXmlFromZip(fileContent)
  }
  if (lower.endsWith('.gz') || lower.endsWith('.gzip')) {
    try {
      return gunzipSync(fileContent, { maxOutputLength: MAX_UNCOMPRESSED_SIZE })
    } catch {
      return null
    }
  }
  if (lower.endsWith('.xml')) {
    return fileContent
  }
  return null
}
```

- [ ] **Step 5: Patch `utils/dmarc/parser.ts`**

```ts
import { XMLParser } from 'fast-xml-parser'

export const parser = new XMLParser({
  ignoreAttributes: true,
  parseTagValue: false,
  trimValues: true,
  processEntities: false,
})
```

- [ ] **Step 6: Add DOCTYPE/ENTITY rejection in `utils/dmarc/parseDmarcXml.ts`**

Open the file and add an early guard at the very top of `parseDmarcXml(buffer)`:
```ts
const text = buffer.toString('utf8')
if (/<!DOCTYPE/i.test(text) || /<!ENTITY/i.test(text)) {
  throw new Error('DOCTYPE/ENTITY declarations not allowed in DMARC XML')
}
```

(If the file currently does not stringify the buffer, do so once and reuse.)

- [ ] **Step 7: Harden `utils/dmarc/processZipEntry.ts` against zip-slip**

Replace:
```ts
import path from 'node:path'
import type yauzl from 'yauzl'
import { handleReadStream } from './handleReadStream'

export function processZipEntry(
  z: yauzl.ZipFile,
  entry: yauzl.Entry,
  entries: { uncompressedSize: number }[],
  currentXmlBuffer: Buffer | null,
  setXmlBuffer: (b: Buffer) => void,
  readNext: () => void,
) {
  entries.push({ uncompressedSize: entry.uncompressedSize })
  const name = entry.fileName
  const normalized = path.posix.normalize(name)
  const unsafe =
    normalized !== name ||
    normalized.includes('..') ||
    path.isAbsolute(normalized) ||
    /[\x00-\x1f]/.test(name)
  if (unsafe) {
    readNext()
    return
  }
  const isXml = normalized.toLowerCase().endsWith('.xml')
  if (isXml && currentXmlBuffer === null) {
    z.openReadStream(
      entry,
      (err2: Error | null, readStream: NodeJS.ReadableStream | undefined) => {
        handleReadStream(err2, readStream, setXmlBuffer, readNext)
      },
    )
  } else {
    readNext()
  }
}
```

- [ ] **Step 8: Run, expect PASS**

```bash
pnpm vitest run test/dmarcParserHardening.test.ts
pnpm type-check && pnpm lint && pnpm test
```

- [ ] **Step 9: Commit**

```bash
git add utils/dmarc test/dmarcParserHardening.test.ts test/fixtures/dmarc/billion-laughs.xml
git commit -m "feat(security): harden DMARC parser against XXE/zip-bomb/zip-slip

- gunzipSync now uses maxOutputLength=MAX_UNCOMPRESSED_SIZE
- XMLParser sets processEntities:false; parseDmarcXml rejects
  DOCTYPE/ENTITY declarations before parsing
- processZipEntry rejects entries with normalized != original,
  parent traversal, absolute paths, or control characters

Each behavior is locked with a regression test."
```

---

### Task 10: Misc hardening — scrypt N, .mcp.json, dead config.ts

**Files:**
- Modify: `services/auth/hashPassword.ts`
- Modify: `services/auth/verifyPassword.ts`
- Modify: `.gitignore`
- Create: `.mcp.example.json`
- Delete: `config.ts` (repo root — dead code; matcher lives in `proxy.ts`)

- [ ] **Step 1: Bump scrypt parameters**

Read `services/auth/hashPassword.ts` and `verifyPassword.ts`. Edit both to use:
```ts
const SCRYPT_OPTS = { N: 131072, r: 8, p: 1, maxmem: 64 * 1024 * 1024 } as const
// scryptSync(password, salt, KEY_LENGTH, SCRYPT_OPTS)
```

`verifyPassword.ts` must use the SAME options to avoid breaking existing hashes. If existing hashes were created with default N=16384, they will FAIL verification under the new params. Mitigation: store scrypt params in the hash blob.

**Concrete approach for backwards compat:** prepend params to the stored hash. Existing format probably `salt$hash`. Change to `scrypt$N$r$p$salt$hash`:

`services/auth/hashPassword.ts`:
```ts
import crypto from 'node:crypto'
import { KEY_LENGTH } from './keyLength'
import { SALT_LENGTH } from './saltLength'

const N = 131072
const r = 8
const p = 1

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(SALT_LENGTH).toString('hex')
  const hash = crypto
    .scryptSync(password, salt, KEY_LENGTH, { N, r, p, maxmem: 64 * 1024 * 1024 })
    .toString('hex')
  return `scrypt$${N}$${r}$${p}$${salt}$${hash}`
}
```

`services/auth/verifyPassword.ts`:
```ts
import crypto from 'node:crypto'
import { KEY_LENGTH } from './keyLength'

export function verifyPassword(password: string, stored: string): boolean {
  let salt: string
  let hash: string
  let opts: { N: number; r: number; p: number }
  if (stored.startsWith('scrypt$')) {
    const [, nStr, rStr, pStr, s, h] = stored.split('$')
    opts = { N: Number(nStr), r: Number(rStr), p: Number(pStr) }
    salt = s
    hash = h
  } else {
    // Legacy format: salt$hash with default scrypt params (N=16384)
    const [s, h] = stored.split('$')
    opts = { N: 16384, r: 8, p: 1 }
    salt = s
    hash = h
  }
  const expected = Buffer.from(hash, 'hex')
  const computed = crypto.scryptSync(password, salt, KEY_LENGTH, {
    ...opts,
    maxmem: 128 * 1024 * 1024,
  })
  if (computed.length !== expected.length) return false
  return crypto.timingSafeEqual(computed, expected)
}
```

- [ ] **Step 2: Add a test asserting verification still works on a legacy hash**

`test/scryptBackcompat.test.ts`:
```ts
import { describe, expect, it } from 'vitest'
import crypto from 'node:crypto'
import { KEY_LENGTH } from '../services/auth/keyLength'
import { verifyPassword } from '../services/auth/verifyPassword'

describe('verifyPassword backwards-compat', () => {
  it('accepts the legacy salt$hash format with default scrypt N', () => {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.scryptSync('hunter2', salt, KEY_LENGTH).toString('hex')
    const stored = `${salt}$${hash}`
    expect(verifyPassword('hunter2', stored)).toBe(true)
    expect(verifyPassword('wrong', stored)).toBe(false)
  })
})
```

- [ ] **Step 3: Run and verify both old and new hashes verify**

```bash
pnpm vitest run test/scryptBackcompat.test.ts
```

- [ ] **Step 4: Add `.mcp.json` to `.gitignore`**

Append to `.gitignore`:
```
# Local MCP server configs (often contain tokens)
.mcp.json
```

- [ ] **Step 5: Create `.mcp.example.json`**

```json
{
  "$schema": "https://anthropic.com/.mcp.schema.json",
  "// Example MCP config. Copy to .mcp.json and customize.": "",
  "servers": {}
}
```

- [ ] **Step 6: Delete dead `config.ts`**

```bash
git rm config.ts
```

Verify nothing imports it: `grep -rln "from '@/config'\|from './config'\|from '../config'\|require('./config')" --include='*.ts' --include='*.tsx'`. Expected: no hits.

- [ ] **Step 7: Full check**

```bash
pnpm type-check && pnpm lint && pnpm test
```

- [ ] **Step 8: Commit**

```bash
git add services/auth .gitignore .mcp.example.json test/scryptBackcompat.test.ts
git rm config.ts
git commit -m "feat(security): scrypt N=131072, gitignore .mcp.json, drop dead config.ts

- Scrypt cost upgraded to N=131072,r=8,p=1; stored hashes now record
  their params (scrypt\$N\$r\$p\$salt\$hash) so legacy salt\$hash hashes
  continue to verify.
- .mcp.json is now gitignored (common footgun for committed tokens);
  ships .mcp.example.json instead.
- Removes config.ts at repo root (dead — the live matcher is in proxy.ts)."
```

---

### Task 11: Smoke test — end-to-end Docker boot + closed API + safe install

**Files:**
- Create: `scripts/smoke.sh` (idempotent local smoke)

- [ ] **Step 1: Write `scripts/smoke.sh`**

```bash
#!/usr/bin/env bash
set -euo pipefail

NAME=vexa-smoke
PORT=14000
SECRET=$(openssl rand -hex 32)
cleanup() { docker rm -f "$NAME" 2>/dev/null || true; }
trap cleanup EXIT

docker build -t "$NAME" .
docker run -d --name "$NAME" -p "$PORT:3000" -e SECRET_KEY="$SECRET" "$NAME"

echo "Waiting for health..."
for i in $(seq 1 30); do
  if curl -fsS "http://127.0.0.1:$PORT/api/v1/health" >/dev/null 2>&1; then break; fi
  sleep 2
done
curl -fsS "http://127.0.0.1:$PORT/api/v1/health" >/dev/null

echo "Asserting closed API..."
status=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PORT/api/v1/reports")
if [ "$status" != "401" ] && [ "$status" != "302" ]; then
  echo "FAIL: /api/v1/reports returned $status (expected 401 or redirect)"
  exit 1
fi

echo "Asserting AI endpoint is closed..."
status=$(curl -s -o /dev/null -w '%{http_code}' -X POST "http://127.0.0.1:$PORT/api/v1/ai/report-insights" -H 'content-type: application/json' -d '{"reportId":1}')
if [ "$status" != "401" ]; then
  echo "FAIL: AI endpoint returned $status (expected 401)"
  exit 1
fi

echo "Asserting remote install is denied without VEXA_ALLOW_REMOTE_INSTALL..."
status=$(curl -s -o /dev/null -w '%{http_code}' -X POST "http://127.0.0.1:$PORT/api/install" -H 'content-type: application/json' -d '{}')
if [ "$status" = "200" ]; then
  echo "FAIL: install accepted no-token remote POST"
  exit 1
fi

echo "OK — smoke test passed."
```

`chmod +x scripts/smoke.sh`

- [ ] **Step 2: Run the smoke test**

```bash
./scripts/smoke.sh
```
Expected: prints `OK — smoke test passed.`

- [ ] **Step 3: Add npm script alias**

In `package.json` scripts:
```json
"smoke": "./scripts/smoke.sh"
```

- [ ] **Step 4: Commit**

```bash
git add scripts/smoke.sh package.json
git commit -m "test: add docker smoke test for boot + closed API + install gating

scripts/smoke.sh builds the image, runs it, and asserts:
- /api/v1/health returns 200
- /api/v1/reports returns 401 (closed by default)
- /api/v1/ai/report-insights returns 401 (closed + rate-limited)
- /api/install rejects remote POST without VEXA_ALLOW_REMOTE_INSTALL"
```

---

### Task 12: README quickstart accuracy + CHANGELOG flush

**Files:**
- Modify: `README.md`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Update README quickstart**

Replace the Docker section with:
```bash
# Docker (recommended)
docker run -d --name vexa -p 127.0.0.1:3000:3000 \
  -v vexa-data:/app/data \
  -e SECRET_KEY=$(openssl rand -hex 32) \
  ghcr.io/vexamail/vexa-insight-dashboard:latest

# Read the one-time install token from container logs:
docker logs vexa | grep -A1 'install token'

# Open http://127.0.0.1:3000/install and paste the token to create the
# first admin user.
```

Add an "Exposing to LAN/Internet" note: `-p 3000:3000` + `-e VEXA_ALLOW_REMOTE_INSTALL=1` + reverse proxy with TLS.

- [ ] **Step 2: Finalize CHANGELOG `[Unreleased]` Security section**

Aggregate all Security bullets from previous tasks into one cohesive section under `## [Unreleased] / ### Security`.

- [ ] **Step 3: Commit**

```bash
git add README.md CHANGELOG.md
git commit -m "docs: update quickstart and CHANGELOG for the security-hardening release"
```

---

## Self-review

1. **Spec coverage** — Every launch blocker B1..B7 + DMARC hardening + scrypt + .mcp.json + dead config.ts is covered by exactly one task. The structural test in Task 4 step 8 ensures no API route slips through unaudited.
2. **Placeholder scan** — Searched for "TODO", "TBD", "implement later". One remaining "TODO follow-up" referring to a client form update in Task 6 step 1 — this is **outside** the server-side launch blocker, deliberately deferred to a follow-up plan. Acceptable.
3. **Type consistency** — `withApiAuth` signature is consistent across Tasks 4 and 5; `safeFetch` returns the same `SafeFetchResult` discriminated union in Tasks 2 and 3; `encryptSecret`/`decryptSecret` round-trip in Task 7 step 4.

---

## What this plan does NOT cover (explicit out-of-scope)

These items are in the audit's "Should fix shortly after launch" or "Good roadmap items" buckets and will live in follow-up plans:

- CSP nonce migration (requires middleware changes — Plan 4)
- CI hardening (SHA-pinning actions, CodeQL, SBOM, cosign — **Plan 2**)
- DMARC parser fixtures with real-world Google/Microsoft/Yahoo XMLs — **Plan 3**
- Idempotency regression test + zip edge-case suite — **Plan 3**
- store/+stores/ consolidation, Zod-at-boundary policy, Drizzle-to-services pull-up — **Plan 4**
- N+1 in getDomainsSummaryAll, monaco eager import, reportEndDate index — **Plan 4**
- CODEOWNERS, troubleshooting docs, ADRs — **Plan 4**
- SSO/RBAC/audit-log seams — separate roadmap
