import { getDb, rawReports } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import { and, eq } from 'drizzle-orm'
import { hasEventInAllowedDomains } from './hasEventInAllowedDomains'

/**
 * Returns the raw XML of the report ingested from `messageId`, or null when
 * there is none or the caller's domain allow-list does not cover it.
 */
export async function getProcessedMessageContent(
  messageId: string,
): Promise<string | null> {
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && allowedIds.length === 0) return null

  const db = getDb()
  const bySourceMessage = eq(rawReports.sourceMessageId, messageId)
  const rows = await db
    .select({ rawXml: rawReports.rawXml })
    .from(rawReports)
    .where(
      allowedIds === null
        ? bySourceMessage
        : and(
            bySourceMessage,
            hasEventInAllowedDomains(rawReports.id, allowedIds),
          ),
    )
    .limit(1)

  return rows[0]?.rawXml ?? null
}
