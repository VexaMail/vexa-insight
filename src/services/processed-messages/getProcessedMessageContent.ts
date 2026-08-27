import { getDb, rawReports } from '@/lib/db'
import { eq } from 'drizzle-orm'

export async function getProcessedMessageContent(
  messageId: string,
): Promise<string | null> {
  const db = getDb()
  const rows = await db
    .select({ rawXml: rawReports.rawXml })
    .from(rawReports)
    .where(eq(rawReports.sourceMessageId, messageId))
    .limit(1)

  return rows[0]?.rawXml ?? null
}
