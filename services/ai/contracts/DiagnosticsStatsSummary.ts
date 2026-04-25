/** Normalized diagnostic stats for the diagnostics AI prompt. */
export type DiagnosticsStatsSummary = {
  totalMessages: number
  failedMessages: number
  passRate: number
  spfAuthFailCount: number
  spfPermerrorCount: number
  spfTemperrorCount: number
  spfSoftfailCount: number
  spfPassUnalignedCount: number
  dkimAllFailCount: number
  dkimPassUnalignedCount: number
  dmarcOverrideForwarded: number
  dmarcOverrideLocalPolicy: number
}
