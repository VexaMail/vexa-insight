'use client'

import { DataTable } from '@/components/ui'
import type { JobRunHistoryTableProps } from '@/types/jobs'
import { useJobRunHistory } from '../../hooks/ingest/useJobRunHistory'
import { getJobRunHistoryColumns } from './jobRunHistoryColumns'

export default function JobRunHistoryTable({
  runs,
}: Readonly<JobRunHistoryTableProps>) {
  const {
    hideEmpty,
    selectedJobId,
    isGlobalRunning,
    currentProcessed,
    activeJobRunId,
    filteredRuns,
    handleToggleHideEmpty,
    handleClearSelection,
    handleRowClick,
  } = useJobRunHistory(runs)

  if (runs.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-muted-foreground">
          No job runs recorded yet. Trigger a poll or wait for the scheduled
          run.
        </p>
      </div>
    )
  }

  const columns = getJobRunHistoryColumns({
    runs,
    isGlobalRunning,
    activeJobRunId,
    currentProcessed,
  })

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-4 duration-500">
      <div className="flex items-center justify-between gap-2">
        {selectedJobId !== null && (
          <p className="text-muted-foreground text-xs">
            Viewing Job{' '}
            <span className="text-foreground font-medium">
              #{selectedJobId}
            </span>
            {' — '}
            <button
              onClick={handleClearSelection}
              className="text-primary hover:underline"
            >
              Clear selection
            </button>
          </p>
        )}
        <div className="ml-auto flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <label htmlFor="hide-empty" className="cursor-pointer select-none">
            Hide empty runs
          </label>
          <input
            id="hide-empty"
            type="checkbox"
            checked={hideEmpty}
            onChange={(e) => {
              handleToggleHideEmpty(e.target.checked)
            }}
            className="h-4 w-4 accent-zinc-900 dark:accent-zinc-50"
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredRuns}
        {...(selectedJobId !== null
          ? { selectedRowId: selectedJobId.toString() }
          : {})}
        onRowClick={(row) => {
          handleRowClick(row.original.id)
        }}
      />
    </div>
  )
}
