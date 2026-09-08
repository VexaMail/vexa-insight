import type { Column } from '@tanstack/react-table'
import type { ReactNode } from 'react'

export type SortableHeaderButtonProps<TData> = {
  readonly column: Column<TData>
  readonly label: ReactNode
}
