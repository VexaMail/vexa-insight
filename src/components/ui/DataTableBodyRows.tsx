import type { DataTableRowsProps } from '@/types/ui'
import { isSelectedTableRow } from '@/utils/ui'
import type { RowData } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import { TableBody } from './TableBody'
import { TableCell } from './TableCell'
import { TableRow } from './TableRow'

/** Body rows of a data table, or its empty state. */
export function DataTableBodyRows<TData extends RowData>({
  table,
  columnCount,
  selectedRowId,
  onRowClick,
}: DataTableRowsProps<TData>) {
  const rows = table.getRowModel().rows
  if (rows.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={columnCount}
            className="text-muted-foreground h-24 text-center"
          >
            No results found.
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() && 'selected'}
          onClick={() => onRowClick?.(row)}
          className={`border-border/30 transition-colors ${
            isSelectedTableRow(row, selectedRowId)
              ? 'bg-primary/10'
              : 'hover:bg-accent/50'
          } ${onRowClick ? 'cursor-pointer' : ''}`}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} className="text-sm">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}
