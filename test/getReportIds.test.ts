import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { seedDomainsSummaryFixture } from './setup/seedDomainsSummaryFixture'
import { setupTestDb } from './setup/setupTestDb'

vi.mock('@/services/auth', () => ({
  getAllowedDomainIds: vi.fn(async () => Promise.resolve(null)),
  getSession: vi.fn(async () => Promise.resolve(null)),
}))

describe('getReportIds (moved from reports/ids route)', () => {
  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  beforeEach(async () => {
    const { resetDmarcDb } = await import('./setup/resetDmarcDb')
    resetDmarcDb()
  })

  it('returns every raw report id as a string when unrestricted', async () => {
    const { getReportIds } = await import('@/services/reports')
    const now = new Date('2026-01-15T12:00:00Z')
    seedDomainsSummaryFixture({
      domainCount: 2,
      reportsPerDomain: 3,
      eventsPerReport: 1,
      beginUnix: Math.floor(new Date('2026-01-01T00:00:00Z').getTime() / 1000),
      endUnix: Math.floor(new Date('2026-01-31T00:00:00Z').getTime() / 1000),
      now,
    })

    const ids = await getReportIds()
    expect(ids).toHaveLength(6)
    expect(ids.every((id) => typeof id === 'string')).toBe(true)
  })

  it('only returns reports with events for allowed domains', async () => {
    const { getAllowedDomainIds } = await import('@/services/auth')
    const { getReportIds } = await import('@/services/reports')
    const now = new Date('2026-01-15T12:00:00Z')
    const { domainIds } = seedDomainsSummaryFixture({
      domainCount: 2,
      reportsPerDomain: 3,
      eventsPerReport: 1,
      beginUnix: Math.floor(new Date('2026-01-01T00:00:00Z').getTime() / 1000),
      endUnix: Math.floor(new Date('2026-01-31T00:00:00Z').getTime() / 1000),
      now,
    })

    const allowed = domainIds[0]
    if (allowed === undefined) throw new Error('fixture produced no domains')
    vi.mocked(getAllowedDomainIds).mockResolvedValueOnce([allowed])
    expect(await getReportIds()).toHaveLength(3)

    vi.mocked(getAllowedDomainIds).mockResolvedValueOnce([])
    expect(await getReportIds()).toEqual([])
  })
})
