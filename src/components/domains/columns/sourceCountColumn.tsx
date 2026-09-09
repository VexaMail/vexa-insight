import { SortableHeaderButton } from '@/components/ui'
import type { ColumnDef } from '@tanstack/react-table'
import type { SourceRow } from '../SourceRow'

export const sourceCountColumn: ColumnDef<SourceRow> = {
  accessorKey: 'count',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Count" />
  ),
  cell: ({ row }) => {
    const val = row.original.count
    return (
      <span className="text-zinc-600 dark:text-zinc-400">
        {val.toLocaleString()}
      </span>
    )
  },
}
