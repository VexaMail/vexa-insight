import { buildKpiSeries, seriesBuckets } from '@/utils/dashboard'
import { describe, expect, it } from 'vitest'

describe('seriesBuckets', () => {
  it('uses one bucket per day up to thirty days', () => {
    expect(seriesBuckets({ fromDay: 100, toDay: 129 }, null)).toHaveLength(30)
  })

  it('groups longer windows into at most thirty buckets covering every day', () => {
    const buckets = seriesBuckets({ fromDay: 100, toDay: 189 }, null)
    expect(buckets.length).toBeLessThanOrEqual(30)
    expect(buckets[0]?.fromDay).toBe(100)
    expect(buckets.at(-1)?.toDay).toBe(189)
  })

  it('starts the all-time window at the first day with data', () => {
    expect(seriesBuckets({ fromDay: 0, toDay: 10 }, 8)[0]?.fromDay).toBe(8)
  })
})

describe('buildKpiSeries', () => {
  it('derives each sparkline from the daily rows', () => {
    const series = buildKpiSeries({
      buckets: [
        { fromDay: 1, toDay: 1 },
        { fromDay: 2, toDay: 2 },
        { fromDay: 3, toDay: 3 },
      ],
      daily: [
        { domainId: 1, day: 1, total: 10, passed: 9 },
        { domainId: 2, day: 1, total: 10, passed: 10 },
        { domainId: 1, day: 3, total: 4, passed: 2 },
      ],
      reports: [
        { day: 1, count: 2 },
        { day: 3, count: 1 },
      ],
      domains: [],
    })
    expect(series.messages).toEqual([20, 0, 4])
    // A day without messages is left out rather than drawn as 0%.
    expect(series.passRate).toEqual([95, 50])
    expect(series.reportingDomains).toEqual([2, 0, 1])
    expect(series.reports).toEqual([2, 0, 1])
  })
})
