/** Aggregated DMARC report data across all reports for a domain. */
export type DiagnosticsReportAggregate = {
  reportCount: number
  orgCount: number
  totalMessages: number
  spfPassCount: number
  dkimPassCount: number
  spfAlignedCount: number
  dkimAlignedCount: number
  dispositionBreakdown: Record<string, number>
  topOrgs: { orgName: string; messageCount: number }[]
  forwardedOverrideCount: number
  dateRange: {
    start: string | null
    end: string | null
  }
}
