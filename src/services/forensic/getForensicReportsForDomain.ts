import { forensicReports, getDb } from '@/lib/db'
import type { ForensicReportRow } from '@/types/forensic'
import { desc, eq } from 'drizzle-orm'

/** The most recent failure reports for a domain, newest first. */
export function getForensicReportsForDomain(
  domainName: string,
  limit: number,
): ForensicReportRow[] {
  const columns = forensicReports
  return getDb()
    .select({
      id: columns.id,
      reportedDomain: columns.reportedDomain,
      feedbackType: columns.feedbackType,
      authFailure: columns.authFailure,
      sourceIp: columns.sourceIp,
      reportingMta: columns.reportingMta,
      arrivalDate: columns.arrivalDate,
      headerFromDomain: columns.headerFromDomain,
      envelopeFromDomain: columns.envelopeFromDomain,
      dkimDomain: columns.dkimDomain,
      dkimSelector: columns.dkimSelector,
      spfResult: columns.spfResult,
      dkimResult: columns.dkimResult,
      dmarcResult: columns.dmarcResult,
      originalMessageId: columns.originalMessageId,
      listId: columns.listId,
    })
    .from(forensicReports)
    .where(eq(forensicReports.reportedDomain, domainName.toLowerCase()))
    .orderBy(desc(forensicReports.arrivalDate))
    .limit(limit)
    .all()
}
