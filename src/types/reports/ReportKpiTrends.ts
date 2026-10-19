/**
 * Per-report series of the receiver's latest reports about the domain,
 * oldest first: message volume and the three alignment shares (0-100).
 */
export type ReportKpiTrends = {
  readonly messages: readonly number[]
  readonly spfAligned: readonly number[]
  readonly dkimAligned: readonly number[]
  readonly dmarcPass: readonly number[]
}
