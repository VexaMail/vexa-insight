import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/services/api', () => ({
  hasValidApiKey: vi.fn(async () => false),
}))

vi.mock('@/services/auth/getSession', () => ({
  getSession: vi.fn(async () => null),
}))

/**
 * `requirePermission` is the only gate on permission-checked routes, and the
 * shared `SECRET_KEY` is the one credential every automation client holds. Its
 * grant set is pinned here: report movement and configuration reads yes, user
 * management and audit-log reads no, so a leaked key cannot escalate into
 * account takeover or erase its own trail.
 */
describe('requirePermission with the shared API key', () => {
  beforeEach(async () => {
    const { hasValidApiKey } = await import('@/services/api')
    const { getSession } = await import('@/services/auth')
    vi.mocked(getSession).mockResolvedValue(null)
    vi.mocked(hasValidApiKey).mockResolvedValue(true)
  })

  it('grants the report, settings-read and AI permissions', async () => {
    const { requirePermission } = await import('@/services/auth')

    expect(await requirePermission('reports:read')).toBeNull()
    expect(await requirePermission('reports:write')).toBeNull()
    expect(await requirePermission('settings:read')).toBeNull()
    expect(await requirePermission('ai:invoke')).toBeNull()
  })

  it('denies user management and audit-log access with 403', async () => {
    const { requirePermission } = await import('@/services/auth')

    for (const permission of ['users:read', 'users:write', 'audit:read']) {
      const denied = await requirePermission(permission as 'users:write')
      expect(denied?.status).toBe(403)
    }
  })

  it('denies configuration writes with 403', async () => {
    const { requirePermission } = await import('@/services/auth')

    expect((await requirePermission('settings:write'))?.status).toBe(403)
    expect((await requirePermission('install:write'))?.status).toBe(403)
    expect((await requirePermission('imap:rotate'))?.status).toBe(403)
  })

  it('answers 401, not 403, without a session or a key', async () => {
    const { hasValidApiKey } = await import('@/services/api')
    const { requirePermission } = await import('@/services/auth')
    vi.mocked(hasValidApiKey).mockResolvedValue(false)

    expect((await requirePermission('reports:read'))?.status).toBe(401)
  })

  it('checks a session against its role instead of the key list', async () => {
    const { getSession } = await import('@/services/auth')
    const { requirePermission } = await import('@/services/auth')
    vi.mocked(getSession).mockResolvedValue({
      user: { role: 'admin' },
    } as never)

    // An admin session keeps the permissions the key does not have.
    expect(await requirePermission('users:write')).toBeNull()
    expect(await requirePermission('audit:read')).toBeNull()
  })
})
