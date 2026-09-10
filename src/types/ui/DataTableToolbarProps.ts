import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { Table as ReactTable, RowData } from '@tanstack/react-table'

export type DataTableToolbarProps<TData extends RowData> = {
  readonly table: ReactTable<typeof dataTableFeatures, TData>
  readonly globalFilter: string
  readonly onGlobalFilterChange: (value: string) => void
  readonly toolbarActions:
    | React.ReactNode
    | ((table: ReactTable<typeof dataTableFeatures, TData>) => React.ReactNode)
    | undefined
}
