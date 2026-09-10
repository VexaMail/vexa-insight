import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import { formatRunAt } from '@/utils/format'
import type { ColumnDef } from '@tanstack/react-table'
import type { JobRunRow } from './JobRunRow'

export const jobRunRunAtColumn: ColumnDef<typeof dataTableFeatures, JobRunRow> =
  {
    accessorKey: 'runAt',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="Run at" />
    ),
    cell: ({ row }) => (
      <span className="text-foreground text-sm">
        {formatRunAt(row.getValue('runAt'))}
      </span>
    ),
    sortFn: 'datetime',
  }
