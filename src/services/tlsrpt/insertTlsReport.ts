import { tlsReports } from '@/lib/db'
import type { ReportTransaction } from '@/types/reports'
import type { TlsReport } from '@/types/tlsrpt'

/**
 * Inserts the TLS report row; null when the same organisation and report id
 * are already stored, so a concurrent ingest is a no-op, not an error.
 */
export function insertTlsReport(
  tx: ReportTransaction,
  report: TlsReport,
): number | null {
  const inserted = tx
    .insert(tlsReports)
    .values({
      reportId: report.reportId,
      orgName: report.orgName,
      contactInfo: report.contactInfo,
      beginDate: report.beginDate,
      endDate: report.endDate,
      rawJson: report.rawJson,
      sourceMessageId: report.sourceMessageId ?? null,
      ingestedAt: new Date(),
    })
    .onConflictDoNothing({ target: [tlsReports.orgName, tlsReports.reportId] })
    .returning({ id: tlsReports.id })
    .all()

  return inserted[0]?.id ?? null
}
