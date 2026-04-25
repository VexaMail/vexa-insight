import type {
  ColumnDef,
  Table as ReactTable,
  Row,
  SortingState,
} from '@tanstack/react-table'

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  hideToolbar?: boolean
  hidePagination?: boolean
  onRowClick?: (row: Row<TData>) => void
  selectedRowId?: string | undefined
  toolbarActions?:
    | React.ReactNode
    | ((table: ReactTable<TData>) => React.ReactNode)
  initialSorting?: SortingState
  defaultPageSize?: number
  pageSizeOptions?: (number | 'all')[]
}
