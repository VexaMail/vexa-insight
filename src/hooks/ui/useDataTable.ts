import { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { DataTableProps, UseDataTableReturn } from '@/types/ui'
import type {
  ColumnFiltersState,
  RowData,
  SortingState,
} from '@tanstack/react-table'
import { useTable } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

export function useDataTable<TData extends RowData>(
  props: Readonly<DataTableProps<TData>>,
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

  const table = useTable({
    features: dataTableFeatures,
    data: props.data,
    columns: props.columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    initialState: {
      pagination: { pageIndex: 0, pageSize },
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  })

  return { globalFilter, setGlobalFilter, table }
}
