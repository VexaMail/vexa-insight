import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type {
  ColumnDef,
  Table as ReactTable,
  Row,
  RowData,
  SortingState,
} from '@tanstack/react-table'

export type DataTableProps<TData extends RowData> = {
  readonly columns: ColumnDef<typeof dataTableFeatures, TData>[]
  readonly data: TData[]
  readonly hideToolbar?: boolean
  readonly hidePagination?: boolean
  readonly onRowClick?: (row: Row<typeof dataTableFeatures, TData>) => void
  readonly selectedRowId?: string
  readonly toolbarActions?:
    | React.ReactNode
    | ((table: ReactTable<typeof dataTableFeatures, TData>) => React.ReactNode)
  readonly initialSorting?: SortingState
  readonly defaultPageSize?: number
  readonly pageSizeOptions?: (number | 'all')[]
}
