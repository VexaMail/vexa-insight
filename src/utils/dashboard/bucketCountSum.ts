import type { DailyCount, DayRange } from '@/types/dashboard'

/** Sum of the daily counts inside one bucket. */
export function bucketCountSum(
  counts: readonly DailyCount[],
  bucket: DayRange,
): number {
  return counts
    .filter((c) => c.day >= bucket.fromDay && c.day <= bucket.toDay)
    .reduce((sum, c) => sum + c.count, 0)
}
