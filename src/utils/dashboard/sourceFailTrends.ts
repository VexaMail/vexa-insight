import type { DayRange, IpDailyCount } from '@/types/dashboard'
import { bucketCountSum } from './bucketCountSum'

/** Failing messages per bucket for each IP, keyed by IP. */
export function sourceFailTrends(
  rows: readonly IpDailyCount[],
  ips: readonly string[],
  buckets: readonly DayRange[],
): Record<string, number[]> {
  return Object.fromEntries(
    ips.map((ip) => {
      const own = rows.filter((r) => r.ip === ip)
      return [ip, buckets.map((b) => bucketCountSum(own, b))]
    }),
  )
}
