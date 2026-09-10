import type { DataTableToolbarProps } from '@/types/ui'
import type { RowData } from '@tanstack/react-table'
import { SearchIcon } from 'lucide-react'
import { Input } from './input'

/** Search box and caller-supplied actions above a data table. */
export function DataTableToolbar<TData extends RowData>({
  table,
  globalFilter,
  onGlobalFilterChange,
  toolbarActions,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative max-w-sm flex-1">
        <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search all columns..."
          value={globalFilter}
          onChange={(event) => {
            onGlobalFilterChange(event.target.value)
          }}
          className="bg-card border-border/50 pl-9"
        />
      </div>
      {toolbarActions ? (
        <div className="flex items-center gap-2">
          {typeof toolbarActions === 'function'
            ? toolbarActions(table)
            : toolbarActions}
        </div>
      ) : null}
    </div>
  )
}
