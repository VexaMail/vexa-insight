'use client'

import { useDataTable } from '@/hooks/ui'
import type { DataTableProps } from '@/types/ui'
import { DataTableBodyRows } from './DataTableBodyRows'
import { DataTableHeaderRows } from './DataTableHeaderRows'
import { DataTableToolbar } from './DataTableToolbar'
import { Table } from './table'
import { UnifiedPagination } from './UnifiedPagination'

export function DataTable<TData, TValue>({
  columns,
  data,
  hideToolbar = false,
  hidePagination = false,
  onRowClick,
  selectedRowId,
  toolbarActions,
  initialSorting,
  defaultPageSize,
  pageSizeOptions,
}: Readonly<DataTableProps<TData, TValue>>) {
  const props: Readonly<DataTableProps<TData, TValue>> = {
    columns,
    data,
    ...(hideToolbar ? { hideToolbar } : {}),
    ...(hidePagination ? { hidePagination } : {}),
    ...(onRowClick ? { onRowClick } : {}),
    ...(selectedRowId !== undefined ? { selectedRowId } : {}),
    ...(toolbarActions ? { toolbarActions } : {}),
    ...(initialSorting ? { initialSorting } : {}),
    ...(defaultPageSize ? { defaultPageSize } : {}),
    ...(pageSizeOptions ? { pageSizeOptions } : {}),
  }

  const { globalFilter, setGlobalFilter, table } = useDataTable<TData, TValue>(
    props,
  )

  return (
    <div className="space-y-4">
      {!hideToolbar && (
        <DataTableToolbar
          table={table}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          toolbarActions={toolbarActions}
        />
      )}

      <div className="glass-card overflow-hidden">
        <Table>
          <DataTableHeaderRows table={table} />
          <DataTableBodyRows
            table={table}
            columnCount={columns.length}
            selectedRowId={selectedRowId}
            onRowClick={onRowClick}
          />
        </Table>
      </div>

      {!hidePagination && (
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
      )}
    </div>
  )
}
