import type { PaginatedReports, ReportsTableAction } from '@/types/reports'

export type ReportsTablePaginationProps = {
  readonly data: PaginatedReports
  readonly dispatch: React.Dispatch<ReportsTableAction>
}
