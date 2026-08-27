'use client'

import {
  APPLY_UPDATE_ENDPOINT_PATH,
  SELF_UPDATE_POLL_MS,
} from '@/constants/updates'
import type { UseSelfUpdateReturn } from '@/types/settings'
import type { SelfUpdateStatus } from '@/types/updates'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useSelfUpdate(apiKey: string): UseSelfUpdateReturn {
  const [status, setStatus] = useState<SelfUpdateStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isStarting, setIsStarting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const load = useCallback(async () => {
    try {
      const response = await fetch(APPLY_UPDATE_ENDPOINT_PATH, {
        cache: 'no-store',
      })
      if (!response.ok)
        throw new Error(`Request failed (${String(response.status)})`)
      const json = (await response.json()) as { data: SelfUpdateStatus }
      setStatus(json.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        const response = await fetch(APPLY_UPDATE_ENDPOINT_PATH, {
          cache: 'no-store',
        })
        if (!response.ok)
          throw new Error(`Request failed (${String(response.status)})`)
        const json = (await response.json()) as { data: SelfUpdateStatus }
        if (!cancelled) setStatus(json.data)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error')
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!status?.log.running) return
    pollRef.current = setInterval(() => {
      void load()
    }, SELF_UPDATE_POLL_MS)
    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [status?.log.running, load])

  const start = useCallback(async () => {
    setIsStarting(true)
    setError(null)
    try {
      const response = await fetch(APPLY_UPDATE_ENDPOINT_PATH, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': apiKey },
        body: JSON.stringify({}),
      })
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: { message?: string }
        } | null
        throw new Error(
          body?.error?.message ?? `Request failed (${String(response.status)})`,
        )
      }
      const json = (await response.json()) as { data: SelfUpdateStatus }
      setStatus(json.data)
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
      !window.confirm(
        'Apply the latest update now? The dashboard will be unreachable for ~30 seconds while the new build is installed and the process restarts.',
      )
    ) {
      return
    }
    void start()
  }, [apiKey, start])

  return { status, isLoading, isStarting, error, handleApplyClick }
}
