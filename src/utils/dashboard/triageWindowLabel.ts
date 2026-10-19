import type { DayRange } from '@/types/dashboard'
import { DAY_SECONDS, toIsoDayFromUnixSeconds } from '@/utils/dates'

/** "last 30 days", "all time" or "2026-10-01 to 2026-10-19". */
export function triageWindowLabel(
  range: DayRange,
  preset: number | null,
): string {
  if (preset === null) {
    const from = toIsoDayFromUnixSeconds(range.fromDay * DAY_SECONDS) ?? ''
    const to = toIsoDayFromUnixSeconds(range.toDay * DAY_SECONDS) ?? ''
    return `${from} to ${to}`
  }
  return preset === 1 ? 'last day' : `last ${String(preset)} days`
}
