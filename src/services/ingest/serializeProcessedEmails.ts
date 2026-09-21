import type { ProcessedMessageRow } from '@/services/processed-messages'
import type { ProcessedEmail } from '@/types/ingest'

/** Makes processed-message rows serialisable for the client components. */
export function serializeProcessedEmails(
  rows: ProcessedMessageRow[],
): ProcessedEmail[] {
  return rows.map((row) => ({
    id: row.id,
    messageId: row.messageId,
    processedAt: row.processedAt.toISOString(),
    accountLabel: row.accountLabel,
    jobRunId: row.jobRunId,
  }))
}
