'use client'

import type { UseCronsSectionParams } from '@/types/ingest'
import { useRouter } from 'next/navigation'
import { useAbortPoll } from './useAbortPoll'
import { useCronsSectionViewModel } from './useCronsSectionViewModel'
import { usePollStatusFetcher } from './usePollStatusFetcher'
import { useRefreshOnCronsStop } from './useRefreshOnCronsStop'

/** View model plus the polling and refresh effects behind the crons section. */
export function useCronsSection({
  ingestionIntervalMinutes,
  initialApiKey,
  isHistoricalJobContext,
  jobId,
}: UseCronsSectionParams) {
  const router = useRouter()
  const { abortStatus, handleAbort } = useAbortPoll(initialApiKey)
  const viewModel = useCronsSectionViewModel(ingestionIntervalMinutes)
  const { isRunning, runRequested, page, pageSize, applyPollStatusData } =
    viewModel

  useRefreshOnCronsStop(isRunning, router)

  usePollStatusFetcher({
    isHistoricalJobContext,
    jobId,
    page,
    pageSize,
    isRunning,
    runRequested,
    abortStatus,
    applyPollStatusData,
  })

  return { viewModel, abortStatus, handleAbort }
}
