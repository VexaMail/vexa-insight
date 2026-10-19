export type IpSummaryData = {
  ip: string
  countryCode: string | null
  hostname: string | null
  hostnameLastLookupAt: number | null
  totalMessages: number
  emailsSentCount: number
  firstSeen: number | null
  lastSeen: number | null
  /** SPF passed aligned with From (policy_evaluated). */
  spfPassCount: number
  /** DKIM passed aligned with From (policy_evaluated). */
  dkimPassCount: number
  /** SPF authentication passed, aligned or not. */
  spfAuthPassCount: number
  /** SPF passed for a domain that is not aligned with From. */
  spfUnalignedPassCount: number
  /** At least one DKIM signature verified, aligned or not. */
  dkimAuthPassCount: number
  /** A DKIM signature verified for a domain not aligned with From. */
  dkimUnalignedPassCount: number
  /** SPF or DKIM passed aligned, so DMARC passed. */
  dmarcPassCount: number
  spfAuthPassRate: number
  dkimAuthPassRate: number
  dmarcPassRate: number
  fullyAlignedCount: number
  spfPassRate: number
  dkimPassRate: number
  fullyAlignedRate: number
  dispositionNone: number
  dispositionQuarantine: number
  dispositionReject: number
}
