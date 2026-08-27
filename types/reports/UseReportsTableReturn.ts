import type { PaginatedReports } from './PaginatedReports'
import type { ReportsTableAction } from './ReportsTableAction'
import type { ReportsTableState } from './ReportsTableState'

export type UseReportsTableReturn = {
  state: ReportsTableState
  dispatch: React.Dispatch<ReportsTableAction>
  orgOptions: string[]
  domainOptions: string[]
  filtered: PaginatedReports['items']
  updateUrlParams: (key: string, value: string) => void
}
