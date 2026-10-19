import { RECENT_ERROR_DAYS } from '@/constants/dashboard'
import type { JobRunRow } from '@/types/jobs'
import { DAY_SECONDS } from '@/utils/dates'

/** Errors summed over the runs that started in the last few days. */
export function recentRunErrors(
  runs: readonly JobRunRow[],
  nowMs: number,
): number {
  const since = nowMs - RECENT_ERROR_DAYS * DAY_SECONDS * 1000
  return runs
    .filter((run) => run.runAt.getTime() >= since)
    .reduce((sum, run) => sum + run.errorCount, 0)
}
