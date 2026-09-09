'use client'

import { POLL_INTERVAL_MS } from '@/constants/ingest'
import type { UsePollStatusFetcherParams } from '@/types/ingest'
import { buildPollStatusUrl, fetchPollStatusData } from '@/utils/ingest'
import { useEffect } from 'react'

export function usePollStatusFetcher({
  isHistoricalJobContext,
  jobId,
  page,
  pageSize,
  isRunning,
  runRequested,
  abortStatus,
  applyPollStatusData,
}: UsePollStatusFetcherParams) {
  useEffect(() => {
    let active = true

    async function fetchAction() {
      const data = await fetchPollStatusData(
        buildPollStatusUrl({ isHistoricalJobContext, jobId, page, pageSize }),
      )
      if (active && data) applyPollStatusData(data)
    }

    const shouldPoll = isRunning || runRequested || abortStatus === 'loading'

    if (isHistoricalJobContext && jobId) {
      void fetchAction()
    } else if (shouldPoll && !isHistoricalJobContext) {
      void fetchAction()
      const t = setInterval(() => {
        void fetchAction()
      }, POLL_INTERVAL_MS)
      return () => {
        active = false
        clearInterval(t)
      }
    } else if (!isHistoricalJobContext) {
      void fetchAction()
    }

    return () => {
      active = false
    }
  }, [
    isHistoricalJobContext,
    jobId,
    isRunning,
    runRequested,
    abortStatus,
    page,
    pageSize,
    applyPollStatusData,
  ])
}
