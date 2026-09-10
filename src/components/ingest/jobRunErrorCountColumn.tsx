import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import type { JobRunRow } from './JobRunRow'

export const jobRunErrorCountColumn: ColumnDef<
  typeof dataTableFeatures,
  JobRunRow
> = {
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
