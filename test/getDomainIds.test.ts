import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { seedDomainsSummaryFixture } from './setup/seedDomainsSummaryFixture'
import { setupTestDb } from './setup/setupTestDb'

vi.mock('@/services/auth', () => ({
  getAllowedDomainIds: vi.fn(() => Promise.resolve(null)),
  getSession: vi.fn(() => Promise.resolve(null)),
}))

describe('getDomainIds (moved from domains/ids route)', () => {
  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  beforeEach(async () => {
    const { resetDmarcDb } = await import('./setup/resetDmarcDb')
    resetDmarcDb()
  })

  it('returns all domain ids as strings when unrestricted', async () => {
    const { getDomainIds } = await import('@/services/reports')
    const now = new Date('2026-01-15T12:00:00Z')
    const { domainIds } = seedDomainsSummaryFixture({
      domainCount: 3,
      reportsPerDomain: 1,
      eventsPerReport: 1,
      beginUnix: Math.floor(new Date('2026-01-01T00:00:00Z').getTime() / 1000),
      endUnix: Math.floor(new Date('2026-01-31T00:00:00Z').getTime() / 1000),
      now,
    })

    const ids = await getDomainIds()
    expect(ids).toHaveLength(3)
    expect(new Set(ids)).toEqual(new Set(domainIds.map((d) => d.toString())))
  })

  it('filters to allowed domains and returns [] for an empty allow-list', async () => {
    const { getAllowedDomainIds } = await import('@/services/auth')
    const { getDomainIds } = await import('@/services/reports')
    const now = new Date('2026-01-15T12:00:00Z')
    const { domainIds } = seedDomainsSummaryFixture({
      domainCount: 3,
      reportsPerDomain: 1,
      eventsPerReport: 1,
      beginUnix: Math.floor(new Date('2026-01-01T00:00:00Z').getTime() / 1000),
      endUnix: Math.floor(new Date('2026-01-31T00:00:00Z').getTime() / 1000),
      now,
    })

    const allowed = domainIds[0]
    if (allowed === undefined) throw new Error('fixture produced no domains')
    vi.mocked(getAllowedDomainIds).mockResolvedValueOnce([allowed])
    expect(await getDomainIds()).toEqual([allowed.toString()])

    vi.mocked(getAllowedDomainIds).mockResolvedValueOnce([])
    expect(await getDomainIds()).toEqual([])
  })
})
