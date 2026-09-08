import { SortableHeaderButton } from '@/components/ui'
import { formatRunAt } from '@/utils/format'
import { isActiveJobRun } from '@/utils/ingest'
import type { ColumnDef } from '@tanstack/react-table'
import type { GetJobRunHistoryColumnsParams } from './GetJobRunHistoryColumnsParams'
import type { JobRunRow } from './JobRunRow'
import { JobRunStatusBadge } from './JobRunStatusBadge'

export function getJobRunHistoryColumns({
  runs,
  isGlobalRunning,
  activeJobRunId,
  currentProcessed,
}: GetJobRunHistoryColumnsParams): ColumnDef<JobRunRow>[] {
  return [
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
      sortingFn: 'datetime',
    },
    {
      accessorKey: 'success',
      header: ({ column }) => (
        <SortableHeaderButton column={column} label="Status" />
      ),
      cell: ({ row }) => (
        <JobRunStatusBadge
          success={row.original.success}
          isRunning={isActiveJobRun(
            row.original.id,
            isGlobalRunning,
            activeJobRunId,
            runs,
          )}
        />
      ),
    },
    {
      accessorKey: 'processed',
      header: ({ column }) => (
        <SortableHeaderButton column={column} label="Processed" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {(isActiveJobRun(
            row.original.id,
            isGlobalRunning,
            activeJobRunId,
            runs,
          )
            ? Math.max(row.original.processed, currentProcessed)
            : row.original.processed
          ).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'ingested',
      header: ({ column }) => (
        <SortableHeaderButton column={column} label="Ingested" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {row.original.ingested.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'errorCount',
      header: ({ column }) => (
        <SortableHeaderButton column={column} label="Errors" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {row.getValue('errorCount')}
        </span>
      ),
    },
  ]
}
