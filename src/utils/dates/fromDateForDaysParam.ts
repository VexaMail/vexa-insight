import { getFromDateFromDays } from './getFromDateFromDays'

/**
 * Resolves the `days` query fallback to a start date; the literal `custom`
 * and anything outside 1..9998 yield undefined.
 */
export function fromDateForDaysParam(
  days: string | null | undefined,
): Date | undefined {
  if (!days || days === 'custom') return undefined
  const parsed = Number.parseInt(days, 10)
  if (Number.isNaN(parsed) || parsed <= 0 || parsed >= 9999) return undefined
  return getFromDateFromDays(new Date(), parsed)
}
