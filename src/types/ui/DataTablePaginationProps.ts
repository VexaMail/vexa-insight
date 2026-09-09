import type { Table } from '@tanstack/react-table'

export type DataTablePaginationProps<TData> = {
  readonly table: Table<TData>
  readonly pageSizeOptions: (number | 'all')[] | undefined
}
