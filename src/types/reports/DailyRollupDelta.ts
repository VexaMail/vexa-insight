/**
 * Per-day message aggregates contributed by one parsed report, used to update
 * event_rollup_daily incrementally at ingest.
 */
export type DailyRollupDelta = {
  totalCount: number
  passedCount: number
}
