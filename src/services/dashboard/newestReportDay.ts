import type { DomainPeriodTotals } from '@/types/dashboard'

/** The most recent report day across the given domains. */
export function newestReportDay(domains: DomainPeriodTotals[]): number | null {
  let newest: number | null = null
  for (const d of domains) {
    if (
      d.lastReportDay !== null &&
      (newest === null || d.lastReportDay > newest)
    ) {
      newest = d.lastReportDay
    }
  }
  return newest
}
