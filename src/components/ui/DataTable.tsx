'use client'

import { useDataTable } from '@/hooks/ui'
import type { DataTableProps } from '@/types/ui'
import { flexRender } from '@tanstack/react-table'
import { SearchIcon } from 'lucide-react'
import { Input } from './input'
import { Table } from './table'
import { TableBody } from './TableBody'
import { TableCell } from './TableCell'
import { TableHead } from './TableHead'
import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'
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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search all columns..."
              value={globalFilter}
              onChange={(event) => {
                setGlobalFilter(event.target.value)
              }}
              className="bg-card border-border/50 pl-9"
            />
          </div>
          {toolbarActions && (
            <div className="flex items-center gap-2">
              {typeof toolbarActions === 'function'
                ? toolbarActions(table)
                : toolbarActions}
            </div>
          )}
        </div>
      )}

      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="border-border/50 hover:bg-transparent"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-muted-foreground text-xs font-medium"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => onRowClick?.(row)}
                  className={`border-border/30 transition-colors ${
                    selectedRowId !== undefined &&
                    row.original !== null &&
                    (row.original as Record<string, unknown>)[
                      'id'
                    ]?.toString() === selectedRowId
                      ? 'bg-primary/10'
                      : 'hover:bg-accent/50'
                  } ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-muted-foreground h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
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
