import type { PeriodTotals } from '@/types/dashboard'

/** Messages that failed DMARC in a period. */
export function failedOf(totals: PeriodTotals): number {
  return totals.total - totals.passed
}
