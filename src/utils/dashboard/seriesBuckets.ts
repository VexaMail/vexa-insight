import { SPARKLINE_MAX_POINTS } from '@/constants/dashboard'
import type { DayRange } from '@/types/dashboard'

/**
 * Splits the window into at most `SPARKLINE_MAX_POINTS` consecutive day
 * ranges, one day each when it fits. The all-time window starts at the first
 * day with data rather than at day zero.
 */
export function seriesBuckets(
  range: DayRange,
  firstDataDay: number | null,
): DayRange[] {
  const start =
    range.fromDay === 0
      ? Math.min(firstDataDay ?? range.toDay, range.toDay)
      : range.fromDay
  const length = range.toDay - start + 1
  const size = Math.ceil(length / SPARKLINE_MAX_POINTS)
  const buckets: DayRange[] = []
  for (let from = start; from <= range.toDay; from += size) {
    buckets.push({
      fromDay: from,
      toDay: Math.min(range.toDay, from + size - 1),
    })
  }
  return buckets
}
