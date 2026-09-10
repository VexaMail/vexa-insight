import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import { isActiveJobRun } from '@/utils/ingest'
import type { ColumnDef } from '@tanstack/react-table'
import type { GetJobRunHistoryColumnsParams } from './GetJobRunHistoryColumnsParams'
import type { JobRunRow } from './JobRunRow'

/** Processed count; the active run shows the live figure when it is higher. */
export function createJobRunProcessedColumn({
  runs,
  isGlobalRunning,
  activeJobRunId,
  currentProcessed,
}: GetJobRunHistoryColumnsParams): ColumnDef<
  typeof dataTableFeatures,
  JobRunRow
> {
  return {
    accessorKey: 'processed',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="Processed" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {(isActiveJobRun(row.original.id, isGlobalRunning, activeJobRunId, runs)
          ? Math.max(row.original.processed, currentProcessed)
          : row.original.processed
        ).toLocaleString()}
      </span>
    ),
  }
}
