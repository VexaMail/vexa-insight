import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('every /api/v1/** route handler enforces auth', () => {
  const walk = (dir: string, out: string[] = []): string[] => {
    for (const entry of readdirSync(dir)) {
      const p = path.join(dir, entry)
      const s = statSync(p)
      if (s.isDirectory()) walk(p, out)
      else if (p.endsWith('route.ts')) out.push(p)
    }
    return out
  }

  const publicAllow = new Set([
    'app/api/v1/health/route.ts',
    'app/api/v1/openapi.json/route.ts',
  ])
  // Server-Sent Events routes: EventSource cannot set request headers, so
  // these authenticate a single-use ticket from the query string instead. The
  // ticket is only mintable behind `requireAdminAuth`, so the allowance is
  // pinned to the exact files rather than granted to any route that happens to
  // call `consumeStreamTicket`.
  const streamTicketAllow = new Set([
    'app/api/v1/admin/geoip/update-db-stream/route.ts',
  ])
  const root = path.resolve(__dirname, '..')
  const routes = walk(path.resolve(root, 'app/api/v1'))
  for (const file of routes) {
    const rel = path.relative(root, file)
    if (publicAllow.has(rel)) continue
    if (streamTicketAllow.has(rel)) {
      it(rel, () => {
        const src = readFileSync(file, 'utf8')
        expect(
          src.includes('consumeStreamTicket('),
          `${rel} is allow-listed as an SSE route and must redeem a stream ticket`,
        ).toBe(true)
      })
      continue
    }
    it(rel, () => {
      const src = readFileSync(file, 'utf8')
      const usesWithApiAuth = src.includes('withApiAuth(')
      const usesRequireAdminAuth = src.includes('requireAdminAuth(')
      const usesRequireAdminAccess = src.includes('requireAdminAccess(')
      const usesRequireSameOrigin = src.includes('requireSameOrigin')
      // A route is acceptable if it either:
      //   * goes through `withApiAuth` (CSRF + auth wrapper),
      //   * uses `requireAdminAuth` (token-only, exempt from CSRF), or
      //   * uses `requireAdminAccess` AND also wires CSRF via
      //     `requireSameOrigin`. Using `requireAdminAccess` alone is not
      //     enough for mutating cookie-session routes — without
      //     `requireSameOrigin` a logged-in admin loading a malicious page
      //     can have requests forged via CSRF.
      const hasAuth =
        usesWithApiAuth ||
        usesRequireAdminAuth ||
        (usesRequireAdminAccess && usesRequireSameOrigin)
      expect(
        hasAuth,
        `${rel} must use withApiAuth, requireAdminAuth, or requireAdminAccess + requireSameOrigin`,
      ).toBe(true)
    })
  }
})
