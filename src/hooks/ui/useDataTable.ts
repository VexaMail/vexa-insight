import type { DataTableProps, UseDataTableReturn } from '@/types/ui'
import type { ColumnFiltersState, SortingState } from '@tanstack/react-table'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'

export function useDataTable<TData, TValue>(
  props: Readonly<DataTableProps<TData, TValue>>,
): UseDataTableReturn<TData> {
  'use no memo'
  const [sorting, setSorting] = useState<SortingState>(
    props.initialSorting ?? [],
  )
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const pageSize = useMemo(() => {
    return props.hidePagination ? 10000 : (props.defaultPageSize ?? 10)
  }, [props.defaultPageSize, props.hidePagination])

  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    initialState: {
      pagination: { pageSize },
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  })

  return { globalFilter, setGlobalFilter, table }
}
