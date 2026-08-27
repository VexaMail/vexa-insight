import type { ReportRow } from './ReportRow'
/**
 * Paginated result for the reports list endpoint.
 */
export type PaginatedReports = {
  items: ReportRow[]
  total: number
  page: number
  pageSize: number
}
