import { getFromDateFromDays } from './getFromDateFromDays'
import { toUnixSeconds } from './toUnixSeconds'

export function getCutoffUnixSecondsFromDays(
  now: Date,
  days: number,
): number | undefined {
  const from = getFromDateFromDays(now, days)
  if (!from) return undefined
  return toUnixSeconds(from)
}
