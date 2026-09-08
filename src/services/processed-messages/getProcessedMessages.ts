import { getDb, imapAccounts, processedMessages } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { SQL } from 'drizzle-orm'
import { and, desc, eq } from 'drizzle-orm'
import { hasReportInAllowedDomains } from './hasReportInAllowedDomains'
import type { ProcessedMessageRow } from './ProcessedMessageRow'

/**
 * Lists the most recently processed messages, optionally for one job run. A
 * restricted caller only sees messages whose report touched a domain in
 * their allow-list.
 */
export async function getProcessedMessages(
  limit = 50,
  jobRunId?: number,
): Promise<ProcessedMessageRow[]> {
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return []

  const conditions: SQL[] = []
  if (jobRunId !== undefined) {
    conditions.push(eq(processedMessages.jobRunId, jobRunId))
  }
  if (allowedIds !== null) {
    conditions.push(
      hasReportInAllowedDomains(processedMessages.messageId, allowedIds),
    )
  }

  const db = getDb()
  return db
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
    .where(and(...conditions))
    .orderBy(desc(processedMessages.processedAt))
    .limit(limit)
}
