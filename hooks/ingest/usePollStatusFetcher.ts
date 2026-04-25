'use client'

import { POLL_INTERVAL_MS } from '@/constants/ingest'
import { doFetch } from '@/lib/fetch'
import type { PollStatusResponseData } from '@/types/ingest'
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
}: {
  isHistoricalJobContext: boolean
  jobId?: number | undefined
  page: number
  pageSize: number
  isRunning: boolean
  runRequested: boolean
  abortStatus: string
  applyPollStatusData: (data: PollStatusResponseData) => void
}) {
  useEffect(() => {
    let active = true

    async function fetchAction() {
      try {
        const url =
          isHistoricalJobContext && jobId
            ? `/api/v1/job-runs/${jobId}/poll-status?page=${page}&pageSize=${pageSize}&_=${Date.now()}`
            : `/api/v1/poll-status?page=${page}&pageSize=${pageSize}&_=${Date.now()}`
        const res = await doFetch(url)
        const json = (await res.json()) as { data?: PollStatusResponseData }
        if (active && json.data) applyPollStatusData(json.data)
      } catch {
        // ignore
      }
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
