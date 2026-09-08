import type { Table as ReactTable, Row } from '@tanstack/react-table'

export type DataTableRowsProps<TData> = {
  readonly table: ReactTable<TData>
  readonly columnCount: number
  readonly selectedRowId: string | undefined
  readonly onRowClick: ((row: Row<TData>) => void) | undefined
}
