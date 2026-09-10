import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { RowData, useTable } from '@tanstack/react-table'

export type UseDataTableReturn<TData extends RowData> = {
  readonly globalFilter: string
  readonly setGlobalFilter: (value: string) => void
  readonly table: ReturnType<typeof useTable<typeof dataTableFeatures, TData>>
}
