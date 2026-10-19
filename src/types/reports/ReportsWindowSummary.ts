/** Totals of every report matching the list filters, not just one page. */
export type ReportsWindowSummary = {
  readonly reports: number
  readonly reporters: number
  readonly domains: number
  readonly messages: number
  /** Messages aligned on neither SPF nor DKIM: they fail DMARC. */
  readonly failingMessages: number
}
