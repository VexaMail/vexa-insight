import type { DmarcReportDateRange } from './DmarcReportDateRange'

/**
 * Fields read from the `report_metadata` element of an aggregate report.
 */
export type DmarcReportMetadata = DmarcReportDateRange & {
  reportId: string
  orgName: string
  email: string
}
