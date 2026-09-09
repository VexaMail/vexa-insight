import { SortableHeaderButton } from '@/components/ui'
import type { ColumnDef } from '@tanstack/react-table'
import type { JobRunRow } from './JobRunRow'

export const jobRunErrorCountColumn: ColumnDef<JobRunRow> = {
  accessorKey: 'errorCount',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Errors" />
  ),
  cell: ({ row }) => (
    <span className="text-muted-foreground text-sm">
      {row.getValue('errorCount')}
    </span>
  ),
}
