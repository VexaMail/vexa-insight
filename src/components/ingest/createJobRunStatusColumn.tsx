import { SortableHeaderButton } from '@/components/ui'
import { isActiveJobRun } from '@/utils/ingest'
import type { ColumnDef } from '@tanstack/react-table'
import type { GetJobRunHistoryColumnsParams } from './GetJobRunHistoryColumnsParams'
import type { JobRunRow } from './JobRunRow'
import { JobRunStatusBadge } from './JobRunStatusBadge'

export function createJobRunStatusColumn({
  runs,
  isGlobalRunning,
  activeJobRunId,
}: GetJobRunHistoryColumnsParams): ColumnDef<JobRunRow> {
  return {
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
  }
}
