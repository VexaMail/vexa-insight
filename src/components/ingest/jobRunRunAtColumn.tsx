import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import { formatHealthTime } from '@/utils/ingest'
import type { ColumnDef } from '@tanstack/react-table'
import type { JobRunRow } from './JobRunRow'

export const jobRunRunAtColumn: ColumnDef<typeof dataTableFeatures, JobRunRow> =
  {
    accessorKey: 'runAt',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="Run at" />
    ),
    cell: ({ row }) => (
      <span className="text-foreground font-mono text-xs whitespace-nowrap tabular-nums">
        {formatHealthTime(row.getValue('runAt'))}
      </span>
    ),
    sortFn: 'datetime',
  }
