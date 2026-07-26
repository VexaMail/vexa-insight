import { getDb, rawReports } from '@/lib/db'
import type { ReportDetailRow } from '@/types/reports'
import { eq } from 'drizzle-orm'
import { loadEvalReportDomains } from './loadEvalReportDomains'

/**
 * Loads a report for the offline harness, without the domain scoping
 * `getReportById` applies.
 *
 * That scoping resolves through `getSession()`, which reads request cookies and
 * therefore cannot run from a script. An eval run is not served for a user, so
 * there is no allow-list to honour — it reads whatever the local database has.
 */
export async function loadEvalReport(
  reportId: number,
): Promise<ReportDetailRow | null> {
  const db = getDb()
  const rows = await db
    .select({
      id: rawReports.id,
      reportId: rawReports.reportId,
      orgName: rawReports.orgName,
      beginDate: rawReports.beginDate,
      endDate: rawReports.endDate,
      sourceEmail: rawReports.sourceEmail,
      ingestedAt: rawReports.ingestedAt,
      rawXml: rawReports.rawXml,
    })
    .from(rawReports)
    .where(eq(rawReports.id, reportId))
    .limit(1)

  const row = rows[0]
  if (!row) return null

  return { ...row, relatedDomains: await loadEvalReportDomains(reportId) }
}
