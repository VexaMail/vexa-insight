import { TREND_RANGE_DAYS } from '@/constants/dashboard'

/** The trend chart's `?trend=` days when it is one of the offered ranges. */
export function parseTrendDays(
  value: string | string[] | undefined,
): number | null {
  const days = Number(Array.isArray(value) ? value[0] : value)
  return TREND_RANGE_DAYS.includes(days) ? days : null
}
