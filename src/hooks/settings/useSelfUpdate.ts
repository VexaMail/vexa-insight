'use client'

import {
  APPLY_UPDATE_CONFIRM_MESSAGE,
  SELF_UPDATE_POLL_MS,
} from '@/constants/updates'
import type { UseSelfUpdateReturn } from '@/types/settings'
import type { SelfUpdateStatus } from '@/types/updates'
import { fetchSelfUpdateStatus, startSelfUpdate } from '@/utils/settings'
import { useCallback, useEffect, useState } from 'react'

export function useSelfUpdate(apiKey: string): UseSelfUpdateReturn {
  const [status, setStatus] = useState<SelfUpdateStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isStarting, setIsStarting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setStatus(await fetchSelfUpdateStatus())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void (async () => {
      await load()
    })()
  }, [load])

  // While an update is running the log grows, so poll until it stops.
  useEffect(() => {
    if (!status?.log.running) return

    const timer = setInterval(() => {
      void load()
    }, SELF_UPDATE_POLL_MS)

    return () => {
      clearInterval(timer)
    }
  }, [status?.log.running, load])

  const start = useCallback(async () => {
    setIsStarting(true)
    setError(null)
    try {
      setStatus(await startSelfUpdate(apiKey))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsStarting(false)
    }
  }, [apiKey])

  const handleApplyClick = useCallback(() => {
    if (!apiKey.trim()) return
    if (
      typeof window !== 'undefined' &&
      !window.confirm(APPLY_UPDATE_CONFIRM_MESSAGE)
    ) {
      return
    }
    void start()
  }, [apiKey, start])

  return { status, isLoading, isStarting, error, handleApplyClick }
}
