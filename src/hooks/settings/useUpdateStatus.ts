'use client'

import { UPDATE_CHECK_ENDPOINT_PATH } from '@/constants/updates'
import type { UseUpdateStatusReturn } from '@/types/settings'
import type { UpdateStatusPublic } from '@/types/updates'
import { useCallback, useEffect, useState } from 'react'

export function useUpdateStatus(apiKey: string): UseUpdateStatusReturn {
  const [status, setStatus] = useState<UpdateStatusPublic | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        const response = await fetch(UPDATE_CHECK_ENDPOINT_PATH, {
          cache: 'no-store',
        })
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }
        const json = (await response.json()) as { data: UpdateStatusPublic }
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

  const refresh = useCallback(async (token: string) => {
    setIsRefreshing(true)
    setError(null)
    try {
      const response = await fetch(UPDATE_CHECK_ENDPOINT_PATH, {
        method: 'POST',
        headers: { 'x-api-key': token },
      })
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: { message?: string }
        } | null
        throw new Error(
          body?.error?.message ?? `Request failed (${response.status})`,
        )
      }
      const json = (await response.json()) as { data: UpdateStatusPublic }
      setStatus(json.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  const handleRefreshClick = useCallback(() => {
    if (!apiKey.trim()) return
    void refresh(apiKey)
  }, [apiKey, refresh])

  const handleCopyText = useCallback((text: string) => {
    void navigator.clipboard.writeText(text)
  }, [])

  return {
    status,
    isLoading,
    isRefreshing,
    error,
    handleRefreshClick,
    handleCopyText,
  }
}
