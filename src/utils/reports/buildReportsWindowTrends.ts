import { REPORTS_TREND_MAX_DAYS } from '@/constants/reports'
import type { ReportsWindowDay, ReportsWindowTrends } from '@/types/reports'
import { percentOf } from './percentOf'

/**
 * Daily series of the reports window from `fromDay` to `toDay`, gaps filled
 * with 0 and capped to the most recent days a sparkline can still show.
 */
export function buildReportsWindowTrends(
  days: readonly ReportsWindowDay[],
  fromDay: number,
  toDay: number,
): ReportsWindowTrends {
  const byDay = new Map(days.map((d) => [d.day, d]))
  const start = Math.max(fromDay, toDay - REPORTS_TREND_MAX_DAYS + 1)
  const series: ReportsWindowDay[] = []
  for (let day = start; day <= toDay; day++) {
    series.push(
      byDay.get(day) ?? {
        day,
        reports: 0,
        reporters: 0,
        domains: 0,
        messages: 0,
        failingMessages: 0,
      },
    )
  }
  return {
    reports: series.map((d) => d.reports),
    reporters: series.map((d) => d.reporters),
    messages: series.map((d) => d.messages),
    failingShare: series.map((d) => percentOf(d.failingMessages, d.messages)),
  }
}
