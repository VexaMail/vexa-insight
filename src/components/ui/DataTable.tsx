'use client'

import { useDataTable } from '@/hooks/ui'
import type { DataTableProps } from '@/types/ui'
import type { RowData } from '@tanstack/react-table'
import { DataTableBodyRows } from './DataTableBodyRows'
import { DataTableHeaderRows } from './DataTableHeaderRows'
import { DataTablePagination } from './DataTablePagination'
import { DataTableToolbar } from './DataTableToolbar'
import { Table } from './table'

export function DataTable<TData extends RowData>(
  props: Readonly<DataTableProps<TData>>,
) {
  const {
    columns,
    hideToolbar = false,
    hidePagination = false,
    onRowClick,
    selectedRowId,
    toolbarActions,
    pageSizeOptions,
  } = props

  const { globalFilter, setGlobalFilter, table } = useDataTable<TData>(props)

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
        <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />
      )}
    </div>
  )
}
