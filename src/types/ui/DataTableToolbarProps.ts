import type { Table as ReactTable } from '@tanstack/react-table'

export type DataTableToolbarProps<TData> = {
  readonly table: ReactTable<TData>
  readonly globalFilter: string
  readonly onGlobalFilterChange: (value: string) => void
  readonly toolbarActions:
    | React.ReactNode
    | ((table: ReactTable<TData>) => React.ReactNode)
    | undefined
}
