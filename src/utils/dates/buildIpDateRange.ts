import type { IpDateRange } from '@/types/filters'
import { ipRangeFromTimestamp } from './ipRangeFromTimestamp'

/**
 * Turns the parsed `days`/`from`/`to` query into the range the IP pages pass
 * down.
 */
export function buildIpDateRange(
  days: number | undefined,
  fromDate: Date | undefined,
  toDate: Date | undefined,
  now: Date = new Date(),
): IpDateRange {
  const fromTs = ipRangeFromTimestamp(days, fromDate, now)

  return {
    fromDate,
    toDate,
    fromTs,
    toTs: toDate ? Math.floor(toDate.getTime() / 1000) : undefined,
    hasDateFilter: fromTs != null || toDate != null,
  }
}
