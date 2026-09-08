import type { Table as ReactTable } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import { TableHead } from './TableHead'
import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'

/** Header groups of a data table. */
export function DataTableHeaderRows<TData>({
  table,
}: Readonly<{ table: ReactTable<TData> }>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow
          className="border-border/50 hover:bg-transparent"
          key={headerGroup.id}
        >
          {headerGroup.headers.map((header) => (
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
          ))}
        </TableRow>
      ))}
    </TableHeader>
  )
}
