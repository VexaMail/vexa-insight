import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { RowData, Table } from '@tanstack/react-table'

export type DataTablePaginationProps<TData extends RowData> = {
  readonly table: Table<typeof dataTableFeatures, TData>
  readonly pageSizeOptions: (number | 'all')[] | undefined
}
