import { getDb, processedMessages } from '@/lib/db'

/**
 * Inserts a processed message record. Ignores duplicate (imap_account_id, message_id).
 */
export async function insertProcessedMessage(
  imapAccountId: number,
  messageId: string,
  jobRunId?: number,
): Promise<void> {
  const db = getDb()
  await db
    .insert(processedMessages)
    .values({
      imapAccountId,
      messageId,
      processedAt: new Date(),
      jobRunId: jobRunId ?? null,
    })
    .onConflictDoNothing({
      target: [processedMessages.imapAccountId, processedMessages.messageId],
    })
}
