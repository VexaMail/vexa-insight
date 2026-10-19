import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { insertSeedDomains } from './setup/insertSeedDomains'
import { insertSeedEvents } from './setup/insertSeedEvents'
import { insertSeedIp } from './setup/insertSeedIp'
import { insertSeedReport } from './setup/insertSeedReport'
import { setupTestDb } from './setup/setupTestDb'

vi.mock('@/services/auth', () => ({
  getAllowedDomainIds: vi.fn(async () => Promise.resolve(null)),
  getAllowedDomainNames: vi.fn(async () => Promise.resolve(null)),
  getSession: vi.fn(async () => Promise.resolve(null)),
}))

vi.mock('@/services/config', () => ({
  getConfig: () => ({ ingestionIntervalMinutes: 60, imapAccounts: [] }),
}))

const now = new Date('2026-01-15T12:00:00Z')
const unix = (iso: string) => Math.floor(new Date(iso).getTime() / 1000)

/** Four events per report: 10 messages, 8 of them DMARC-passing. */
function seedReport(domainIndex: number, reportIndex: number, endIso: string) {
  const domainId = domainIds[domainIndex] ?? 0
  const endUnix = unix(endIso)
  const rawReportId = insertSeedReport({
    domainIndex,
    reportIndex,
    beginUnix: endUnix - 86_400,
    endUnix,
    now,
  })
  insertSeedEvents({
    rawReportId,
    domainId,
    ipId,
    eventsPerReport: 4,
    beginUnix: endUnix - 86_400,
    endUnix,
    now,
  })
}

let domainIds: number[] = []
let ipId = 0

describe('getTriageOverview', () => {
  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  beforeEach(async () => {
    const { resetDmarcDb } = await import('./setup/resetDmarcDb')
    resetDmarcDb()
    domainIds = insertSeedDomains(2, now)
    ipId = insertSeedIp(now)
    seedReport(0, 0, '2026-01-12T00:00:00Z') // current 7 days
    seedReport(0, 1, '2026-01-14T00:00:00Z') // current
    seedReport(1, 0, '2026-01-13T00:00:00Z') // current
    seedReport(0, 2, '2026-01-05T00:00:00Z') // previous 7 days
    seedReport(0, 3, '2025-12-01T00:00:00Z') // outside both
  })

  it('counts the same messages in the KPIs, the domains and the trend', async () => {
    const { getTriageOverview } = await import('@/services/dashboard')
    const { dmarcPassRate } = await import('@/utils/dashboard')
    const o = await getTriageOverview({ days: 7, now })

    expect(o.kpis.passCurrent).toEqual({ total: 30, passed: 24 })
    expect(o.kpis.passPrevious).toEqual({ total: 10, passed: 8 })
    expect(o.kpis.reports).toEqual({ current: 3, previous: 1 })
    expect(dmarcPassRate(o.kpis.passCurrent)).toBe(80)

    const trendTotal = o.trend.reduce((sum, p) => sum + p.total, 0)
    expect(trendTotal).toBe(o.kpis.messages.current)
    expect(o.trend).toHaveLength(7)
    expect(o.trend.find((p) => p.total > 0)?.passRate).toBe(80)
    expect(o.trend.find((p) => p.total === 0)?.passRate).toBeNull()

    const domainTotal = o.domains.reduce((s, d) => s + d.current.total, 0)
    expect(domainTotal).toBe(30)
  })

  it('reports failing sources and the ingestion state from the tables', async () => {
    const { getTriageOverview } = await import('@/services/dashboard')
    const o = await getTriageOverview({ days: 7, now })

    expect(o.failingSources).toEqual([
      expect.objectContaining({
        ip: '203.0.113.1',
        domainCount: 2,
        total: 30,
        failed: 6,
      }),
    ])
    expect(o.ingestion.state).toBe('not_scheduled')
    expect(o.actions.map((a) => a.id)).toContain('ingestion:not-scheduled')
  })
})
