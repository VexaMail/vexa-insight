import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { insertSeedEvents } from './setup/insertSeedEvents'
import { insertSeedIp } from './setup/insertSeedIp'
import { insertSeedReport } from './setup/insertSeedReport'
import { seedDomainsSummaryFixture } from './setup/seedDomainsSummaryFixture'
import { setupTestDb } from './setup/setupTestDb'

vi.mock('@/services/auth', () => ({
  getAllowedDomainIds: vi.fn(async () => Promise.resolve(null)),
  getSession: vi.fn(async () => Promise.resolve(null)),
}))

describe('IP views honour the per-user domain allow-list', () => {
  const BEGIN_UNIX = Math.floor(
    new Date('2026-01-01T00:00:00Z').getTime() / 1000,
  )
  const END_UNIX = Math.floor(new Date('2026-01-31T00:00:00Z').getTime() / 1000)
  const NOW = new Date('2026-01-15T12:00:00Z')
  const SHARED_IP = '203.0.113.1'
  const OTHER_IP = '203.0.113.9'

  /**
   * Seeds three domains that all share one sending IP. `insertSeedEvents`
   * writes counts of 1..eventsPerReport, so each domain contributes
   * 1 + 2 + 3 = 6 messages and the IP totals 18 across every domain.
   */
  const seedSharedIp = (): number[] => {
    const { domainIds } = seedDomainsSummaryFixture({
      domainCount: 3,
      reportsPerDomain: 1,
      eventsPerReport: 3,
      beginUnix: BEGIN_UNIX,
      endUnix: END_UNIX,
      now: NOW,
    })
    return domainIds
  }

  /** Seeds a second IP that only ever sent to `domainId`. */
  const seedIpForDomain = (domainId: number, domainIndex: number): void => {
    const ipId = insertSeedIp(NOW, OTHER_IP)
    const rawReportId = insertSeedReport({
      domainIndex,
      reportIndex: 99,
      beginUnix: BEGIN_UNIX,
      endUnix: END_UNIX,
      now: NOW,
    })
    insertSeedEvents({
      rawReportId,
      domainId,
      ipId,
      eventsPerReport: 1,
      beginUnix: BEGIN_UNIX,
      endUnix: END_UNIX,
      now: NOW,
    })
  }

  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  beforeEach(async () => {
    const { resetDmarcDb } = await import('./setup/resetDmarcDb')
    resetDmarcDb()
    const { getAllowedDomainIds } = await import('@/services/auth')
    vi.mocked(getAllowedDomainIds).mockResolvedValue(null)
  })

  it('reports every domain the IP touched when the caller is unrestricted', async () => {
    const {
      getIpDetail,
      getIpDomains,
      getIpLogs,
      getIpReports,
      getIpsSummary,
    } = await import('@/services/reports')
    seedSharedIp()

    const summary = await getIpsSummary()
    expect(summary.ips).toHaveLength(1)
    expect(summary.ips[0]?.totalMessages).toBe(18)

    expect((await getIpDetail(SHARED_IP))?.totalMessages).toBe(18)
    expect(await getIpDomains(SHARED_IP)).toHaveLength(3)
    expect(await getIpReports(SHARED_IP)).toHaveLength(3)
    expect(await getIpLogs(SHARED_IP)).toHaveLength(9)
  })

  it('counts only the allowed domains for a restricted caller', async () => {
    const { getAllowedDomainIds } = await import('@/services/auth')
    const {
      getIpDetail,
      getIpDomains,
      getIpLogs,
      getIpReports,
      getIpsSummary,
    } = await import('@/services/reports')
    const domainIds = seedSharedIp()
    const allowed = domainIds[0]
    if (allowed === undefined) throw new Error('fixture produced no domains')
    vi.mocked(getAllowedDomainIds).mockResolvedValue([allowed])

    const summary = await getIpsSummary()
    expect(summary.ips).toHaveLength(1)
    expect(summary.ips[0]?.totalMessages).toBe(6)

    expect((await getIpDetail(SHARED_IP))?.totalMessages).toBe(6)

    const relatedDomains = await getIpDomains(SHARED_IP)
    expect(relatedDomains).toHaveLength(1)
    expect(relatedDomains[0]?.domain).toBe('example0.com')
    expect(relatedDomains[0]?.messageCount).toBe(6)

    expect(await getIpReports(SHARED_IP)).toHaveLength(1)
    expect(await getIpLogs(SHARED_IP)).toHaveLength(3)
  })

  it('ranks top senders by the allowed slice only', async () => {
    const { getAllowedDomainIds } = await import('@/services/auth')
    const { getTopIpSenders } = await import('@/services/reports')
    const domainIds = seedSharedIp()
    const allowed = domainIds[0]
    if (allowed === undefined) throw new Error('fixture produced no domains')

    expect((await getTopIpSenders())[0]?.totalMessages).toBe(18)

    vi.mocked(getAllowedDomainIds).mockResolvedValue([allowed])
    const scoped = await getTopIpSenders()
    expect(scoped).toHaveLength(1)
    expect(scoped[0]?.totalMessages).toBe(6)
  })

  it('hides an IP that never sent to an allowed domain', async () => {
    const { getAllowedDomainIds } = await import('@/services/auth')
    const {
      getIpDetail,
      getIpDomains,
      getIpLogs,
      getIpReports,
      getTopIpSenders,
    } = await import('@/services/reports')
    const domainIds = seedSharedIp()
    const allowed = domainIds[0]
    const foreign = domainIds[2]
    if (allowed === undefined || foreign === undefined) {
      throw new Error('fixture produced too few domains')
    }
    seedIpForDomain(foreign, 2)
    vi.mocked(getAllowedDomainIds).mockResolvedValue([allowed])

    expect(await getIpDetail(OTHER_IP)).toBeNull()
    expect(await getIpDomains(OTHER_IP)).toEqual([])
    expect(await getIpReports(OTHER_IP)).toEqual([])
    expect(await getIpLogs(OTHER_IP)).toEqual([])
    expect((await getTopIpSenders()).map((r) => r.ip)).toEqual([SHARED_IP])
  })

  it('returns nothing for an empty allow-list', async () => {
    const { getAllowedDomainIds } = await import('@/services/auth')
    const {
      getIpDetail,
      getIpDomains,
      getIpLogs,
      getIpReports,
      getIpsSummary,
    } = await import('@/services/reports')
    const { getTopIpSenders } = await import('@/services/reports')
    seedSharedIp()
    vi.mocked(getAllowedDomainIds).mockResolvedValue([])

    expect((await getIpsSummary()).ips).toEqual([])
    expect(await getIpDetail(SHARED_IP)).toBeNull()
    expect(await getIpDomains(SHARED_IP)).toEqual([])
    expect(await getIpReports(SHARED_IP)).toEqual([])
    expect(await getIpLogs(SHARED_IP)).toEqual([])
    expect(await getTopIpSenders()).toEqual([])
  })
})
