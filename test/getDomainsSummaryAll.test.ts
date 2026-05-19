import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { seedDomainsSummaryFixture } from './setup/seedDomainsSummaryFixture'
import { setupTestDb } from './setup/setupTestDb'

vi.mock('@/services/auth', () => ({
  getAllowedDomainIds: vi.fn(async () => null),
  getSession: vi.fn(async () => null),
}))

describe('getDomainsSummaryAll (GROUP BY refactor)', () => {
  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  beforeEach(async () => {
    const { resetDmarcDb } = await import('./setup/resetDmarcDb')
    resetDmarcDb()
  })

  it('returns per-domain totals that agree with getDomainSummary', async () => {
    const { getDomainSummary, getDomainsSummaryAll } =
      await import('@/services/reports')
    const now = new Date('2026-01-15T12:00:00Z')
    const beginUnix = Math.floor(
      new Date('2026-01-01T00:00:00Z').getTime() / 1000,
    )
    const endUnix = Math.floor(
      new Date('2026-01-31T00:00:00Z').getTime() / 1000,
    )

    const { domainIds } = seedDomainsSummaryFixture({
      domainCount: 3,
      reportsPerDomain: 5,
      eventsPerReport: 10,
      beginUnix,
      endUnix,
      now,
    })

    const result = await getDomainsSummaryAll()
    expect(result.domains).toHaveLength(3)

    for (const domainId of domainIds) {
      const single = await getDomainSummary(domainId)
      const grouped = result.domains.find((s) => s.domainId === domainId)
      expect(grouped).toBeDefined()
      expect(grouped?.totalMessages).toBe(single?.totalMessages)
      expect(grouped?.passedCount).toBe(single?.passedCount)
      expect(grouped?.failedCount).toBe(single?.failedCount)
      expect(grouped?.passRatePercent).toBeCloseTo(
        single?.passRatePercent ?? 0,
        6,
      )
    }
  })

  it('includes domains with zero events as zero-summary rows', async () => {
    const { getDb, domains } = await import('@/lib/db')
    const { getDomainsSummaryAll } = await import('@/services/reports')

    const db = getDb()
    const now = new Date('2026-01-15T12:00:00Z')
    db.insert(domains)
      .values({
        name: 'empty.example.com',
        createdAt: now,
        updatedAt: now,
        active: true,
      })
      .run()

    const result = await getDomainsSummaryAll()
    expect(result.domains).toHaveLength(1)
    expect(result.domains[0]?.totalMessages).toBe(0)
    expect(result.domains[0]?.passedCount).toBe(0)
    expect(result.domains[0]?.failedCount).toBe(0)
    expect(result.domains[0]?.passRatePercent).toBe(0)
  })
})
