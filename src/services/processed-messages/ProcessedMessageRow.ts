export type ProcessedMessageRow = {
  id: number
  messageId: string
  processedAt: Date
  accountLabel: string | null
  jobRunId: number | null
}
