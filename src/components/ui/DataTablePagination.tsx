'use client'

import type { DataTablePaginationProps } from '@/types/ui'
import { UnifiedPagination } from './UnifiedPagination'

/** The pager driven by the table's own pagination state. */
export function DataTablePagination<TData>({
  table,
  pageSizeOptions,
}: Readonly<DataTablePaginationProps<TData>>) {
  return (
    <UnifiedPagination
      page={table.getState().pagination.pageIndex + 1}
      pageSize={table.getState().pagination.pageSize}
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
