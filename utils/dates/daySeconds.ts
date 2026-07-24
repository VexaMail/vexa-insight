/**
 * Seconds in a UTC day. Single source of truth for the day-bucket size shared
 * by the rollup writer (computeDailyRollupDeltas), the rollup readers, and the
 * backfill script; they must agree or the rollup and live scans diverge.
 */
export const DAY_SECONDS = 86_400
