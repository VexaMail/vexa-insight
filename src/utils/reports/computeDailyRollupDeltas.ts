import type { NormalizedEventPayload } from '@/types/dmarc'
import type { DailyRollupDelta } from '@/types/reports'
import { DAY_SECONDS } from '@/utils/dates'

/**
 * Buckets a report's events into per-day totals for event_rollup_daily.
 *
 * The pass definition (SPF pass OR DKIM pass) mirrors the SQL used by
 * getAggregateStats and getDomainSummary so the rollup and a live scan return
 * identical numbers. Keyed by `floor(reportEndDate / 86400)` (UTC day index).
 */
export function computeDailyRollupDeltas(
  events: readonly NormalizedEventPayload[],
): Map<number, DailyRollupDelta> {
  const byDay = new Map<number, DailyRollupDelta>()
  for (const ev of events) {
    const day = Math.floor(ev.reportEndDate / DAY_SECONDS)
    const bucket = byDay.get(day) ?? { totalCount: 0, passedCount: 0 }
    bucket.totalCount += ev.count
    if (ev.spfResult === 'pass' || ev.dkimResult === 'pass') {
      bucket.passedCount += ev.count
    }
    byDay.set(day, bucket)
  }
  return byDay
}
