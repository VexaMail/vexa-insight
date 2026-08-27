import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Structural RBAC coverage: privileged or mutating /api/v1 routes must
 * enforce a permission, not just authentication.
 *
 * Rules:
 *  1. Every route file exporting a mutating method (POST/PUT/PATCH/DELETE)
 *     must reference `requirePermission(` (session RBAC; a valid shared
 *     admin API key maps to the `admin` role) or `requireAdminAuth(`
 *     (key-only admin surface — sessions are rejected outright, which is
 *     stricter than any role check).
 *  2. Privileged session-facing routes (listed explicitly) must reference
 *     `requirePermission(` themselves, even when the same file also has a
 *     key-only handler.
 *
 * Intentional exemptions (no RBAC by design):
 *  - app/api/v1/health, app/api/v1/openapi.json: public endpoints (see
 *    PUBLIC_API_ROUTES).
 *  - app/api/install/**: pre-auth install flow, gated by loopback origin
 *    plus one-time install token.
 *  - app/api/auth/oidc/**: pre-auth login flow (state/PKCE protected).
 *  - actions/login.ts, actions/auth.ts: login is pre-auth (rate-limited,
 *    audited); logout only invalidates the caller's own session.
 */
describe('privileged and mutating /api/v1 routes enforce RBAC', () => {
  const walk = (dir: string, out: string[] = []): string[] => {
    for (const entry of readdirSync(dir)) {
      const p = path.join(dir, entry)
      const s = statSync(p)
      if (s.isDirectory()) walk(p, out)
      else if (p.endsWith('route.ts')) out.push(p)
    }
    return out
  }

  const mutatingExport =
    /export\s+(?:const|(?:async\s+)?function)\s+(?:POST|PUT|PATCH|DELETE)\b/

  // Routes that must call requirePermission directly (privileged reads and
  // session-facing mutations). Key-only requireAdminAuth routes are covered
  // by rule 1 and intentionally not listed here.
  const mustUseRequirePermission = new Set([
    'app/api/v1/audit-log/route.ts',
    'app/api/v1/users/route.ts',
    'app/api/v1/users/[id]/route.ts',
    'app/api/v1/admin/webhooks/route.ts',
    'app/api/v1/admin/webhooks/[id]/route.ts',
    'app/api/v1/admin/apply-update/route.ts',
    'app/api/v1/admin/update-check/route.ts',
    'app/api/v1/reports/upload/route.ts',
    'app/api/v1/geoip/enrich/route.ts',
    'app/api/v1/ips/[ip]/hostname/refresh/route.ts',
    'app/api/v1/ai/report-insights/route.ts',
    'app/api/v1/ai/diagnostics-insights/route.ts',
  ])

  const root = path.resolve(__dirname, '..')
  const routes = walk(path.resolve(root, 'app/api/v1'))

  for (const file of routes) {
    const rel = path.relative(root, file)
    const src = readFileSync(file, 'utf8')
    const isMutating = mutatingExport.test(src)
    const usesRequirePermission = src.includes('requirePermission(')
    const usesRequireAdminAuth = src.includes('requireAdminAuth(')

    if (isMutating) {
      it(`${rel} (mutating) enforces a permission or is key-only`, () => {
        expect(
          usesRequirePermission || usesRequireAdminAuth,
          `${rel} exports a mutating method but references neither requirePermission nor requireAdminAuth`,
        ).toBe(true)
      })
    }

    if (mustUseRequirePermission.has(rel)) {
      it(`${rel} (privileged) references requirePermission`, () => {
        expect(
          usesRequirePermission,
          `${rel} is classified privileged/mutating and must call requirePermission`,
        ).toBe(true)
      })
    }
  }

  it('covers every explicitly listed privileged route file', () => {
    const relRoutes = new Set(routes.map((f) => path.relative(root, f)))
    for (const rel of mustUseRequirePermission) {
      expect(relRoutes.has(rel), `${rel} no longer exists — update list`).toBe(
        true,
      )
    }
  })
})
