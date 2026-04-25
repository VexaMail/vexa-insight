import type {
  PaginatedReports,
  ReportsTableAction,
  ReportsTableState,
} from '@/types/reports'

export type UseReportsTableReturn = {
  state: ReportsTableState
  dispatch: React.Dispatch<ReportsTableAction>
  orgOptions: string[]
  domainOptions: string[]
  filtered: PaginatedReports['items']
  updateUrlParams: (key: string, value: string) => void
}
