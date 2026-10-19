import type { PeriodTotals } from './PeriodTotals'

/** One monitored domain's message totals in the current and previous period. */
export type DomainPeriodTotals = {
  domainId: number
  domainName: string
  /** When the domain was first seen, unix milliseconds. */
  createdAtMs: number
  /** Last UTC day with report data, any period; null when it never had any. */
  lastReportDay: number | null
  current: PeriodTotals
  previous: PeriodTotals
}
