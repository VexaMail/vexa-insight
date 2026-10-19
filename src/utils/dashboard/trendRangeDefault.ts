import { TREND_RANGE_DAYS } from '@/constants/dashboard'
import type { TriageWindow } from '@/types/dashboard'

/** The picker value that means "follow the page": its days, or `page`. */
export function trendRangeDefault(window: TriageWindow): string {
  const matches = TREND_RANGE_DAYS.some(
    (days) => `last ${String(days)} days` === window.label,
  )
  return matches ? String(window.lengthDays) : 'page'
}
