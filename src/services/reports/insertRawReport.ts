import { rawReports } from '@/lib/db'
import type { ParseResult } from '@/types/dmarc'
import type { ReportTransaction } from '@/types/reports'

/**
 * Inserts the raw report row inside the ingest transaction. Returns null when
 * another ingest stored the same report_id first: the unique constraint turns
 * the race into a no-op instead of a thrown constraint error.
 */
export function insertRawReport(
  tx: ReportTransaction,
  raw: ParseResult['rawReport'],
): number | null {
  const inserted = tx
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
    .onConflictDoNothing({ target: rawReports.reportId })
    .returning({ id: rawReports.id })
    .all()

  return inserted[0]?.id ?? null
}
