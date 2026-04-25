import { getDb, processedMessages } from '@/lib/db'
import { and, eq, inArray } from 'drizzle-orm'

/**
 * Returns a set of Message-IDs that were already processed for this account,
 * given a list of candidate Message-IDs.
 */
export async function getProcessedMessageIdsByMessageIds(
  imapAccountId: number,
  messageIds: string[],
): Promise<Set<string>> {
  if (messageIds.length === 0) return new Set()

  const db = getDb()
  const rows = await db
    .select({ messageId: processedMessages.messageId })
    .from(processedMessages)
    .where(
      and(
        eq(processedMessages.imapAccountId, imapAccountId),
        inArray(processedMessages.messageId, messageIds),
      ),
    )

  return new Set(rows.map((r) => r.messageId))
}
