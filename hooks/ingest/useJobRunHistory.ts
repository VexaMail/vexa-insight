import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import type { JobRunRow } from './JobRunRow'
import { useIngestContext } from './useIngestContext'

export function useJobRunHistory(runs: JobRunRow[]) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialHideEmpty = searchParams.get('hideEmpty') !== 'false'
  const [hideEmpty, setHideEmpty] = useState(initialHideEmpty)

  const selectedJobId = useIngestContext((s) => s.selectedJobId)
  const setSelectedJob = useIngestContext((s) => s.setSelectedJob)
  const isGlobalRunning = useIngestContext((s) => s.isRunning)
  const currentProcessed = useIngestContext((s) => s.currentProcessed)
  const activeJobRunId = useIngestContext((s) => s.activeJobRunId)

  const filteredRuns = useMemo(() => {
    if (!hideEmpty) return runs
    return runs.filter(
      (r) => r.processed > 0 || r.ingested > 0 || r.errorCount > 0,
    )
  }, [runs, hideEmpty])

  const handleToggleHideEmpty = (checked: boolean) => {
    setHideEmpty(checked)
    const newParams = new URLSearchParams(searchParams.toString())
    if (!checked) newParams.set('hideEmpty', 'false')
    else newParams.delete('hideEmpty')
    router.replace(`?${newParams.toString()}`, { scroll: false })
  }

  const handleClearSelection = () => {
    setSelectedJob(null)
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.delete('jobId')
    router.replace(`?${newParams.toString()}`, { scroll: false })
  }

  const handleRowClick = (jobId: number) => {
    setSelectedJob(jobId)
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set('jobId', jobId.toString())
    router.replace(`?${newParams.toString()}`, { scroll: false })
  }

  return {
    hideEmpty,
    selectedJobId,
    isGlobalRunning,
    currentProcessed,
    activeJobRunId,
    filteredRuns,
    handleToggleHideEmpty,
    handleClearSelection,
    handleRowClick,
  }
}
