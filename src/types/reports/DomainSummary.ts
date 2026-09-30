/**
 * Aggregated summary for a domain (e.g. total messages, pass/fail counts).
 */
export type DomainSummary = {
  domainId: number
  domainName: string
  totalMessages: number
  passedCount: number
  failedCount: number
  passRatePercent: number
  /** Last UTC day index with report data; only set by the domains list. */
  lastReportDay?: number | null
}
