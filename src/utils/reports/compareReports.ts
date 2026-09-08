import type { ReportRow, SortKey } from '@/types/reports'

/** Ascending comparison of two reports on one sortable column. */
export function compareReports(
  a: ReportRow,
  b: ReportRow,
  sortKey: SortKey,
): number {
  switch (sortKey) {
    case 'reportId':
      return a.reportId.localeCompare(b.reportId)
    case 'orgName':
      return a.orgName.localeCompare(b.orgName)
    case 'beginDate':
      return a.beginDate - b.beginDate
  }
}
