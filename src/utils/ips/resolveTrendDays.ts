import type { IpDateRange } from '@/types/filters'
import type { IpDailyPoint } from '@/types/ips'

/**
 * The UTC day indexes the sparklines cover: the date range when it has one,
 * else the span of the data, capped to the last `maxDays` days.
 */
export function resolveTrendDays(
  points: readonly IpDailyPoint[],
  dateRange: IpDateRange,
  maxDays: number,
): number[] {
  const daySeconds = 86_400
  if (points.length === 0) return []
  const first = points[0]?.day ?? 0
  const last = points.at(-1)?.day ?? first
  const from = dateRange.fromTs
    ? Math.floor(dateRange.fromTs / daySeconds)
    : first
  const to = dateRange.toTs ? Math.floor(dateRange.toTs / daySeconds) : last
  const start = Math.max(Math.min(from, first), to - maxDays + 1)
  const end = Math.max(to, last)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
