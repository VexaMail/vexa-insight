import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type {
  ReportRow,
  ReportsTableAction,
  SortDir,
  SortKey,
} from '@/types/reports'
import type { Row } from '@tanstack/react-table'

export type ReportsDataTableProps = {
  readonly dispatch: React.Dispatch<ReportsTableAction>
  readonly sortKey: SortKey
  readonly sortDir: SortDir
  readonly filtered: ReportRow[]
  readonly domainName: string | undefined
  readonly loading: boolean
  readonly onRowClick: (row: Row<typeof dataTableFeatures, ReportRow>) => void
}
