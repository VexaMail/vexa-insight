/**
 * Message counts of one source IP for a domain, split by the five facts a
 * DMARC record carries: SPF auth, SPF aligned, DKIM auth, DKIM aligned and the
 * DMARC result. The `fail*` counts break down the DMARC-failing messages only.
 */
export type SourceAuthCounts = {
  readonly messages: number
  readonly spfAuthPass: number
  readonly spfAligned: number
  readonly dkimAuthPass: number
  readonly dkimAligned: number
  readonly dmarcPass: number
  /** Latest report end date that included the source, unix seconds. */
  readonly lastSeen: number
  readonly failSpfAuth: number
  readonly failSpfUnaligned: number
  readonly failDkimNone: number
  readonly failDkimUnaligned: number
}
