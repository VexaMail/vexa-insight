import type { useReactTable } from '@tanstack/react-table'

export type UseDataTableReturn<TData> = {
  readonly globalFilter: string
  readonly setGlobalFilter: (value: string) => void
  readonly table: ReturnType<typeof useReactTable<TData>>
}
