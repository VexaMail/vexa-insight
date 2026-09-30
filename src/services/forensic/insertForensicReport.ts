import { forensicReports } from '@/lib/db'
import type { ForensicReport } from '@/types/forensic'
import type { ReportTransaction } from '@/types/reports'

/**
 * Inserts a failure report; null when the same report mail is already
 * stored, so re-polling a mailbox is a no-op.
 */
export function insertForensicReport(
  tx: ReportTransaction,
  report: ForensicReport,
): number | null {
  const inserted = tx
    .insert(forensicReports)
    .values({
      ...report,
      sourceMessageId: report.sourceMessageId ?? null,
      ingestedAt: new Date(),
    })
    .onConflictDoNothing({ target: forensicReports.sourceMessageId })
    .returning({ id: forensicReports.id })
    .all()
  return inserted[0]?.id ?? null
}
