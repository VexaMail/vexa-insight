import type { PaginatedReports } from './PaginatedReports'
import type { SortDir } from './SortDir'
import type { SortKey } from './SortKey'

export type ReportsTableState = {
  page: number
  pageSize: number
  data: PaginatedReports | null
  loading: boolean
  search: string
  filterOrg: string
  filterDomain: string
  sortKey: SortKey
  sortDir: SortDir
}
