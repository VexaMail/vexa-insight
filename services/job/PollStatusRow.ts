export type PollStatusRow = {
  isRunning: boolean
  lastCheck: Date | null
  currentProcessed: number
  totalEmails: number
  processingEmails: number
  etaMs: number
  abortRequested: boolean
  activeJobRunId: number | null
  statusText: string | null
}
