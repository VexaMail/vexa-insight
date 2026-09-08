import { getFromDateFromDays } from './getFromDateFromDays'

/**
 * Lower bound of an IP date range in Unix seconds: the explicit `from` when
 * given, else the start of the requested window. `days === 9999` is the
 * "all time" sentinel and has no lower bound.
 */
export function ipRangeFromTimestamp(
  days: number | undefined,
  fromDate: Date | undefined,
  now: Date,
): number | undefined {
  if (fromDate) return Math.floor(fromDate.getTime() / 1000)
  if (!days || days === 9999) return undefined
  const start = getFromDateFromDays(now, days) ?? now
  return Math.floor(start.getTime() / 1000)
}
