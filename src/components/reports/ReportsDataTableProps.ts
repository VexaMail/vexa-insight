import type {
  ReportRow,
  ReportsTableAction,
  SortDir,
  SortKey,
} from '@/types/reports'

export type ReportsDataTableProps = {
  readonly dispatch: React.Dispatch<ReportsTableAction>
  readonly sortKey: SortKey
  readonly sortDir: SortDir
  readonly filtered: ReportRow[]
  readonly domainName: string | undefined
  readonly loading: boolean
}
