export type IpLogRow = {
  eventId: number
  headerFrom: string
  envelopeFrom: string | null
  disposition: string
  /** Aligned SPF verdict of the policy evaluation. */
  spfResult: string
  /** Aligned DKIM verdict of the policy evaluation. */
  dkimResult: string
  /** Raw SPF authentication result, before alignment. */
  spfAuthResult: string
  /** Comma-separated domains whose DKIM signature verified, if any. */
  dkimPassDomains: string | null
  /** Comma-separated domains whose DKIM signature was present but failed. */
  dkimFailDomains: string | null
  count: number
  reportId: string
  /** Database id of the report, for linking to its page. */
  reportDbId: number
  orgName: string
  observedAt: number
}
