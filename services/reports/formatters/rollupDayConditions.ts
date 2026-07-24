import { eventRollupDaily } from '@/lib/db'
import { DAY_SECONDS, toUnixSeconds } from '@/utils/dates'
import { gte, lte, type SQL } from 'drizzle-orm'

/**
 * Day-index conditions for filtering event_rollup_daily by a from/to range.
 *
 * The live aggregates filter normalized_events by `reportEndDate` (unix
 * seconds); the rollup stores `floor(reportEndDate / 86400)`, so the bounds are
 * converted to the same day index. DMARC reports are day-aligned, so this keeps
 * parity with the pre-rollup queries at day granularity.
 */
export function getRollupDayConditions(from?: Date, to?: Date): SQL[] {
  const conditions: SQL[] = []
  if (from) {
    conditions.push(
      gte(eventRollupDaily.day, Math.floor(toUnixSeconds(from) / DAY_SECONDS)),
    )
  }
  if (to) {
    conditions.push(
      lte(eventRollupDaily.day, Math.floor(toUnixSeconds(to) / DAY_SECONDS)),
    )
  }
  return conditions
}
