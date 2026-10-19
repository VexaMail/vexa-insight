export type IpsKpis = {
  totalSources: number
  totalMessages: number
  /** Messages where SPF or DKIM passed aligned. */
  dmarcPassMessages: number
  /** Sources that fail both SPF and DKIM alignment. */
  failingSources: number
}
