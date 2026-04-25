import type {
  ColumnDef,
  Table as ReactTable,
  Row,
  SortingState,
} from '@tanstack/react-table'

export type DataTableProps<TData, TValue> = {
  readonly columns: ColumnDef<TData, TValue>[]
  readonly data: TData[]
  readonly hideToolbar?: boolean
  readonly hidePagination?: boolean
  readonly onRowClick?: (row: Row<TData>) => void
  readonly selectedRowId?: string
  readonly toolbarActions?:
    | React.ReactNode
    | ((table: ReactTable<TData>) => React.ReactNode)
  readonly initialSorting?: SortingState
  readonly defaultPageSize?: number
  readonly pageSizeOptions?: (number | 'all')[]
}
