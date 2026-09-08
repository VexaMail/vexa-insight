import { rawReports } from '@/lib/db'

/** Columns of the reports list view; `rawXml` is deliberately not among them. */
export const reportListSelection = {
  id: rawReports.id,
  reportId: rawReports.reportId,
  orgName: rawReports.orgName,
  beginDate: rawReports.beginDate,
  endDate: rawReports.endDate,
  sourceEmail: rawReports.sourceEmail,
  ingestedAt: rawReports.ingestedAt,
}
