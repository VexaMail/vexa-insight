import { SortIcon } from '@/components/ui'
import { cn } from '@/lib/utils'
import { formatRunAt } from '@/utils/format'
import type { ColumnDef } from '@tanstack/react-table'
import { CheckCircle, Loader2, XCircle } from 'lucide-react'
import type { GetJobRunHistoryColumnsParams } from './GetJobRunHistoryColumnsParams'
import type { JobRunRow } from './JobRunRow'

export function getJobRunHistoryColumns({
  runs,
  isGlobalRunning,
  activeJobRunId,
  currentProcessed,
}: GetJobRunHistoryColumnsParams): ColumnDef<JobRunRow>[] {
  return [
    {
      accessorKey: 'runAt',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return (
          <div
            className="flex cursor-pointer items-center gap-1 select-none"
            onClick={() => column.toggleSorting(isSorted === 'asc')}
          >
            Run at
            <SortIcon
              active={isSorted !== false}
              dir={isSorted === 'asc' ? 'asc' : 'desc'}
            />
          </div>
        )
      },
      cell: ({ row }) => (
        <span className="text-foreground text-sm">
          {formatRunAt(row.getValue('runAt'))}
        </span>
      ),
      sortingFn: 'datetime',
    },
    {
      accessorKey: 'success',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return (
          <div
            className="flex cursor-pointer items-center gap-1 select-none"
            onClick={() => column.toggleSorting(isSorted === 'asc')}
          >
            Status
            <SortIcon
              active={isSorted !== false}
              dir={isSorted === 'asc' ? 'asc' : 'desc'}
            />
          </div>
        )
      },
      cell: ({ row }) => {
        const success = row.getValue('success') as boolean
        const jobId = row.original.id
        const isCurrentlyRunning =
          isGlobalRunning &&
          (activeJobRunId ? activeJobRunId === jobId : jobId === runs[0]?.id)

        if (isCurrentlyRunning) {
          return (
            <span className="bg-info/10 text-info inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium">
              <Loader2 className="h-3 w-3 animate-spin" />
              Running
            </span>
          )
        }

        return (
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
              success
                ? 'bg-success/10 text-success'
                : 'bg-danger/10 text-danger',
            )}
          >
            {success ? (
              <CheckCircle className="h-3 w-3" />
            ) : (
              <XCircle className="h-3 w-3" />
            )}
            {success ? 'OK' : 'Failed'}
          </span>
        )
      },
    },
    {
      accessorKey: 'processed',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return (
          <div
            className="flex cursor-pointer items-center gap-1 select-none"
            onClick={() => column.toggleSorting(isSorted === 'asc')}
          >
            Processed
            <SortIcon
              active={isSorted !== false}
              dir={isSorted === 'asc' ? 'asc' : 'desc'}
            />
          </div>
        )
      },
      cell: ({ row }) => {
        const jobId = row.original.id
        const isCurrentlyRunning =
          isGlobalRunning &&
          (activeJobRunId ? activeJobRunId === jobId : jobId === runs[0]?.id)
        const count = isCurrentlyRunning
          ? Math.max(row.getValue('processed') as number, currentProcessed)
          : (row.getValue('processed') as number)

        return (
          <span className="text-muted-foreground text-sm">
            {count.toLocaleString()}
          </span>
        )
      },
    },
    {
      accessorKey: 'ingested',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return (
          <div
            className="flex cursor-pointer items-center gap-1 select-none"
            onClick={() => column.toggleSorting(isSorted === 'asc')}
          >
            Ingested
            <SortIcon
              active={isSorted !== false}
              dir={isSorted === 'asc' ? 'asc' : 'desc'}
            />
          </div>
        )
      },
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {(row.getValue('ingested') as number).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'errorCount',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return (
          <div
            className="flex cursor-pointer items-center gap-1 select-none"
            onClick={() => column.toggleSorting(isSorted === 'asc')}
          >
            Errors
            <SortIcon
              active={isSorted !== false}
              dir={isSorted === 'asc' ? 'asc' : 'desc'}
            />
          </div>
        )
      },
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {row.getValue('errorCount')}
        </span>
      ),
    },
  ]
}
