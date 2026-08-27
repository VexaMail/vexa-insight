'use client'

import {
  POLL_STATUS_IDLE_INTERVAL_MS,
  POLL_STATUS_RUNNING_INTERVAL_MS,
} from '@/constants/dashboard'
import { doFetch } from '@/lib/fetch'
import type { PollStatus } from '@/types/dashboard'
import { useEffect, useRef, useState } from 'react'

export function usePollStatusLive(initialStatus: PollStatus): PollStatus {
  const [status, setStatus] = useState<PollStatus>(initialStatus)
  const isRunningRef = useRef<boolean>(initialStatus.isRunning)

  useEffect(() => {
    let active = true
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    async function tick() {
      try {
        const res = await doFetch(`/api/v1/poll-status?_=${String(Date.now())}`)
        const json = (await res.json()) as { data?: PollStatus }
        if (!active) return
        if (json.data) {
          setStatus(json.data)
          isRunningRef.current = json.data.isRunning
        }
      } catch {
        // ignore
      } finally {
        if (active) {
          const delay = isRunningRef.current
            ? POLL_STATUS_RUNNING_INTERVAL_MS
            : POLL_STATUS_IDLE_INTERVAL_MS
          timeoutId = setTimeout(() => {
            void tick()
          }, delay)
        }
      }
    }

    const initialDelay = isRunningRef.current
      ? POLL_STATUS_RUNNING_INTERVAL_MS
      : POLL_STATUS_IDLE_INTERVAL_MS
    timeoutId = setTimeout(() => {
      void tick()
    }, initialDelay)

    return () => {
      active = false
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return status
}
