'use client'

import type { DataTablePaginationProps } from '@/types/ui'
import type { RowData } from '@tanstack/react-table'
import { UnifiedPagination } from './UnifiedPagination'

/** The pager driven by the table's own pagination state. */
export function DataTablePagination<TData extends RowData>({
  table,
  pageSizeOptions,
}: Readonly<DataTablePaginationProps<TData>>) {
  return (
    <UnifiedPagination
      page={table.store.state.pagination.pageIndex + 1}
      pageSize={table.store.state.pagination.pageSize}
      total={table.getFilteredRowModel().rows.length}
      onPageChange={(p) => {
        table.setPageIndex(p - 1)
      }}
      onPageSizeChange={(s) => {
        table.setPageSize(s)
      }}
      pageSizeOptions={pageSizeOptions}
    />
  )
}
