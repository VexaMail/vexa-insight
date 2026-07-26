import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { insertSeedDomains } from './setup/insertSeedDomains'
import { setupTestDb } from './setup/setupTestDb'

vi.mock('@/services/api', () => ({
  getApiKeyRole: vi.fn(async () => null),
}))

vi.mock('@/services/auth/getSession', () => ({
  getSession: vi.fn(async () => null),
}))

/**
 * `getAllowedDomainIds` is the only gate between a restricted user and every
 * domain-scoped query, so its contract is pinned here: null means "all
 * domains", an empty array means "none", and anything ambiguous must resolve
 * to "none" rather than "all".
 */
describe('getAllowedDomainIds', () => {
  const NOW = new Date('2026-01-15T12:00:00Z')

  const mockSession = (
    role: string,
    allowedDomains: string | null,
  ): { user: { role: string; allowedDomains: string | null } } => ({
    user: { role, allowedDomains },
  })

  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  beforeEach(async () => {
    const { resetDmarcDb } = await import('./setup/resetDmarcDb')
    resetDmarcDb()
    const { getSession } = await import('@/services/auth')
    const { getApiKeyRole } = await import('@/services/api')
    vi.mocked(getSession).mockResolvedValue(null)
    vi.mocked(getApiKeyRole).mockResolvedValue(null)
  })

  it('treats a valid shared API key as unrestricted', async () => {
    const { getApiKeyRole } = await import('@/services/api')
    const { getAllowedDomainIds } = await import('@/services/auth')
    vi.mocked(getApiKeyRole).mockResolvedValue('admin')

    expect(await getAllowedDomainIds()).toBeNull()
  })

  it('denies everything without a session or a key', async () => {
    const { getAllowedDomainIds } = await import('@/services/auth')

    expect(await getAllowedDomainIds()).toEqual([])
  })

  it('resolves an allow-list to domain ids', async () => {
    const { getAllowedDomainIds, getSession } = await import('@/services/auth')
    const domainIds = insertSeedDomains(3, NOW)
    vi.mocked(getSession).mockResolvedValue(
      mockSession('user', JSON.stringify(['example1.com'])) as never,
    )

    expect(await getAllowedDomainIds()).toEqual([domainIds[1]])
  })

  it('leaves admins and unrestricted users unscoped', async () => {
    const { getAllowedDomainIds, getSession } = await import('@/services/auth')

    vi.mocked(getSession).mockResolvedValue(
      mockSession('admin', JSON.stringify(['example0.com'])) as never,
    )
    expect(await getAllowedDomainIds()).toBeNull()

    vi.mocked(getSession).mockResolvedValue(mockSession('user', null) as never)
    expect(await getAllowedDomainIds()).toBeNull()
  })

  it('fails closed on an unusable allow-list', async () => {
    const { getAllowedDomainIds, getSession } = await import('@/services/auth')
    insertSeedDomains(3, NOW)

    // An explicit empty list means "restricted to nothing", never "all".
    vi.mocked(getSession).mockResolvedValue(mockSession('user', '[]') as never)
    expect(await getAllowedDomainIds()).toEqual([])

    vi.mocked(getSession).mockResolvedValue(
      mockSession('user', 'not json') as never,
    )
    expect(await getAllowedDomainIds()).toEqual([])

    vi.mocked(getSession).mockResolvedValue(
      mockSession('user', '{"example0.com":true}') as never,
    )
    expect(await getAllowedDomainIds()).toEqual([])
  })

  it('denies a user whose allowed domains no longer exist', async () => {
    const { getAllowedDomainIds, getSession } = await import('@/services/auth')
    insertSeedDomains(1, NOW)
    vi.mocked(getSession).mockResolvedValue(
      mockSession('user', JSON.stringify(['deleted.com'])) as never,
    )

    expect(await getAllowedDomainIds()).toEqual([])
  })
})
