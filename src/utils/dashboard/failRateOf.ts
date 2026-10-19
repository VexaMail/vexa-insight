import type { PeriodTotals } from '@/types/dashboard'
import { dmarcPassRate } from './dmarcPassRate'

/** Share of messages failing DMARC: the complement of `dmarcPassRate`. */
export function failRateOf(totals: PeriodTotals): number | null {
  const rate = dmarcPassRate(totals)
  return rate === null ? null : 100 - rate
}
