/**
 * Message totals of one raw report by alignment outcome.
 */
export type ReportAlignmentCounts = {
  totalMessages: number
  spfAlignedCount: number
  dkimAlignedCount: number
  /** Messages aligned on SPF and DKIM at once. */
  bothAlignedCount: number
  /** Messages that pass DMARC: aligned on SPF or on DKIM (RFC 7489 6.6.2). */
  dmarcPassCount: number
}
