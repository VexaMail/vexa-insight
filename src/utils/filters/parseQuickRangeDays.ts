import { DATE_RANGE_DAYS } from '@/types/filters'

/** The preset day count a select value names, or null for anything else. */
export function parseQuickRangeDays(value: string): number | null {
  const parsedDays = parseInt(value, 10)
  return DATE_RANGE_DAYS.find((d) => d === parsedDays) ?? null
}
