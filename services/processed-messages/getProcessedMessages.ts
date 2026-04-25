import { getDb, imapAccounts, processedMessages } from '@/lib/db'
import { desc, eq } from 'drizzle-orm'
import type { ProcessedMessageRow } from './ProcessedMessageRow'

export async function getProcessedMessages(
  limit = 50,
  jobRunId?: number,
): Promise<ProcessedMessageRow[]> {
  const db = getDb()
  const query = db
    .select({
      id: processedMessages.id,
      messageId: processedMessages.messageId,
      processedAt: processedMessages.processedAt,
      accountLabel: imapAccounts.label,
      jobRunId: processedMessages.jobRunId,
    })
    .from(processedMessages)
    .leftJoin(
      imapAccounts,
      eq(processedMessages.imapAccountId, imapAccounts.id),
    )
    .orderBy(desc(processedMessages.processedAt))
    .limit(limit)

  if (jobRunId !== undefined) {
    return query.where(eq(processedMessages.jobRunId, jobRunId))
  }
  return query
}
