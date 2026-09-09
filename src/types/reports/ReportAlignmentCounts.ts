/**
 * Message totals of one raw report by alignment outcome.
 */
export type ReportAlignmentCounts = {
  totalMessages: number
  spfAlignedCount: number
  dkimAlignedCount: number
  bothAlignedCount: number
}
