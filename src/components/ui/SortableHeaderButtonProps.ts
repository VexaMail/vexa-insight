import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { Column, RowData } from '@tanstack/react-table'
import type { ReactNode } from 'react'

export type SortableHeaderButtonProps<TData extends RowData> = {
  readonly column: Column<typeof dataTableFeatures, TData>
  readonly label: ReactNode
  /** Sort descending on the first click. Defaults to ascending. */
  readonly descendingFirst?: boolean
}
