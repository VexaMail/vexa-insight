import { getDb, processedMessages } from '@/lib/db'
import { and, eq } from 'drizzle-orm'

/**
 * Returns true if the message (by Message-ID) was already processed for this account.
 */
export async function isMessageProcessed(
  imapAccountId: number,
  messageId: string,
): Promise<boolean> {
  const db = getDb()
  const row = await db
    .select({ id: processedMessages.id })
    .from(processedMessages)
    .where(
      and(
        eq(processedMessages.imapAccountId, imapAccountId),
        eq(processedMessages.messageId, messageId),
      ),
    )
    .limit(1)
    .then((rows) => rows[0])
  return row != null
}
