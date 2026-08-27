export type ProcessedEmail = {
  id: number
  messageId: string
  processedAt: string
  accountLabel: string | null
  jobRunId: number | null
}
