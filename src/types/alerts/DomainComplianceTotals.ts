/** Messages and DMARC-passing messages of one domain over one window. */
export type DomainComplianceTotals = {
  readonly total: number
  /** Messages aligned on SPF or DKIM, the DMARC pass definition. */
  readonly aligned: number
}
