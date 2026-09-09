import { SortableHeaderButton } from '@/components/ui'
import { formatRunAt } from '@/utils/format'
import type { ColumnDef } from '@tanstack/react-table'
import type { JobRunRow } from './JobRunRow'

export const jobRunRunAtColumn: ColumnDef<JobRunRow> = {
  accessorKey: 'runAt',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Run at" />
  ),
  cell: ({ row }) => (
    <span className="text-foreground text-sm">
      {formatRunAt(row.getValue('runAt'))}
    </span>
  ),
  sortingFn: 'datetime',
}
