import type { PeriodTotals } from '@/types/dashboard'

/**
 * The one DMARC pass rate of the console: messages whose DMARC evaluation
 * passed (aligned SPF pass or aligned DKIM pass, as the receiver reported it)
 * divided by every message reported, as a percentage. Null when nothing was
 * reported, so an empty period never reads as 0% or 100%.
 */
export function dmarcPassRate(totals: PeriodTotals): number | null {
  if (totals.total <= 0) return null
  return (totals.passed / totals.total) * 100
}
