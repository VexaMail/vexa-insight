/** Message counts the report prompt summarizes before listing events. */
export type ReportEventTotals = {
  totalMessages: number
  spfPassCount: number
  dkimPassCount: number
  spfAlignedCount: number
  dkimAlignedCount: number
  dispositionSummary: string
}
