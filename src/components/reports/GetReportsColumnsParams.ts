import type { ReportsTableAction } from '@/types/reports'
import type { SortDir } from '../../types/reports/SortDir'
import type { SortKey } from '../../types/reports/SortKey'
import type { ReportRow } from './ReportRow'

export type GetReportsColumnsParams = {
  dispatch: React.Dispatch<ReportsTableAction>
  sortKey: SortKey
  sortDir: SortDir
  filtered: ReportRow[]
  domainName: string | undefined
  setScope: (ids: string[]) => void
}
