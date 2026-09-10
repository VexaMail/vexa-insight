import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import type { JobRunRow } from './JobRunRow'

export const jobRunIngestedColumn: ColumnDef<
  typeof dataTableFeatures,
  JobRunRow
> = {
  accessorKey: 'ingested',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Ingested" />
  ),
  cell: ({ row }) => (
    <span className="text-muted-foreground text-sm">
      {row.original.ingested.toLocaleString()}
    </span>
  ),
}
