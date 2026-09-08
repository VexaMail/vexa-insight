import type { getDb } from '@/lib/db'
import { rawReports } from '@/lib/db'
import type { ParseResult } from '@/types/dmarc'
import { eq } from 'drizzle-orm'

/**
 * Inserts the raw report row. Returns null when the report id is already
 * stored, which is what makes the ingest idempotent.
 */
export async function insertRawReport(
  db: ReturnType<typeof getDb>,
  raw: ParseResult['rawReport'],
): Promise<number | null> {
  const existing = await db
    .select({ id: rawReports.id })
    .from(rawReports)
    .where(eq(rawReports.reportId, raw.reportId))
    .limit(1)
  if (existing.length > 0) return null

  const inserted = await db
    .insert(rawReports)
    .values({
      reportId: raw.reportId,
      orgName: raw.orgName,
      beginDate: raw.beginDate,
      endDate: raw.endDate,
      rawXml: raw.rawXml,
      sourceEmail: raw.sourceEmail,
      sourceMessageId: raw.sourceMessageId,
      ingestedAt: new Date(),
    })
    .returning({ id: rawReports.id })

  const rawReportId = inserted[0]?.id
  if (rawReportId == null) throw new Error('Failed to insert raw report')

  return rawReportId
}
