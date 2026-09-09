'use client'

import { DataTable } from '@/components/ui'
import type { JobRunHistoryTableProps } from '@/types/jobs'
import { useJobRunHistory } from '../../hooks/ingest/useJobRunHistory'
import { getJobRunHistoryColumns } from './jobRunHistoryColumns'
import { JobRunHistoryEmptyState } from './JobRunHistoryEmptyState'
import { JobRunHistoryToolbar } from './JobRunHistoryToolbar'

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

  if (runs.length === 0) return <JobRunHistoryEmptyState />

  const columns = getJobRunHistoryColumns({
    runs,
    isGlobalRunning,
    activeJobRunId,
    currentProcessed,
  })

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 space-y-4 duration-500">
      <JobRunHistoryToolbar
        selectedJobId={selectedJobId}
        hideEmpty={hideEmpty}
        onClearSelection={handleClearSelection}
        onToggleHideEmpty={handleToggleHideEmpty}
      />
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
