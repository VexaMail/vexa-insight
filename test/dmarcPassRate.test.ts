import {
  buildTriageKpis,
  dmarcPassRate,
  resolveTriageWindow,
} from '@/utils/dashboard'
import { describe, expect, it } from 'vitest'

describe('dmarcPassRate (the one pass-rate definition of the console)', () => {
  it('is DMARC-passing messages over every reported message, in percent', () => {
    expect(dmarcPassRate({ total: 1396, passed: 1270 })).toBeCloseTo(90.97, 2)
  })

  it('is null, not 0% or 100%, when nothing was reported', () => {
    expect(dmarcPassRate({ total: 0, passed: 0 })).toBeNull()
  })

  it('is what the KPI strip reports: all domains pooled, not averaged', () => {
    const window = resolveTriageWindow({
      days: 30,
      now: new Date('2026-01-31T12:00:00Z'),
    })
    const domain = (id: number, total: number, passed: number) => ({
      domainId: id,
      domainName: `d${String(id)}.example.com`,
      createdAtMs: 0,
      lastReportDay: null,
      current: { total, passed },
      previous: { total: 0, passed: 0 },
    })
    // 100% of 10 and 50% of 990: the pooled rate is 50.5%, the mean 75%.
    const kpis = buildTriageKpis(
      [domain(1, 10, 10), domain(2, 990, 495)],
      { current: 2, previous: 0 },
      window,
      { messages: [], passRate: [], reportingDomains: [], reports: [] },
    )
    expect(dmarcPassRate(kpis.passCurrent)).toBeCloseTo(50.5, 5)
    expect(kpis.messages.current).toBe(1000)
  })
})
