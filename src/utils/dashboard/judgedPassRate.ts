import { TRIAGE_MIN_VOLUME } from '@/constants/dashboard'
import type { PeriodTotals } from '@/types/dashboard'
import { dmarcPassRate } from './dmarcPassRate'

/** The pass rate when the period has enough messages to judge it, else null. */
export function judgedPassRate(totals: PeriodTotals): number | null {
  return totals.total >= TRIAGE_MIN_VOLUME ? dmarcPassRate(totals) : null
}
