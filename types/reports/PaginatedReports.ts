import type { ReportRow } from '@/types/reports'

/**
 * Paginated result for the reports list endpoint.
 */
export type PaginatedReports = {
  items: ReportRow[]
  total: number
  page: number
  pageSize: number
}
