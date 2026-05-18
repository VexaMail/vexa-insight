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
  const root = path.resolve(__dirname, '..')
  const routes = walk(path.resolve(root, 'app/api/v1'))
  for (const file of routes) {
    const rel = path.relative(root, file)
    if (publicAllow.has(rel)) continue
    it(rel, () => {
      const src = readFileSync(file, 'utf8')
      const hasAuth =
        src.includes('withApiAuth(') ||
        src.includes('requireAdminAuth(') ||
        src.includes('requireAdminAccess(')
      expect(
        hasAuth,
        `${rel} must use withApiAuth / requireAdminAuth / requireAdminAccess`,
      ).toBe(true)
    })
  }
})
