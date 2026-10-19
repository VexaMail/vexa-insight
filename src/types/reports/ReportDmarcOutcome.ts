/** Message totals of one report against DMARC: SPF or DKIM aligned passes. */
export type ReportDmarcOutcome = {
  totalMessages: number
  failingMessages: number
}
