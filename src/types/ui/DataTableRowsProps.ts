import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { Table as ReactTable, Row, RowData } from '@tanstack/react-table'

export type DataTableRowsProps<TData extends RowData> = {
  readonly table: ReactTable<typeof dataTableFeatures, TData>
  readonly columnCount: number
  readonly selectedRowId: string | undefined
  readonly onRowClick:
    ((row: Row<typeof dataTableFeatures, TData>) => void) | undefined
}
