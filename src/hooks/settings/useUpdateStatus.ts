'use client'

import type { UseUpdateStatusReturn } from '@/types/settings'
import type { UpdateStatusPublic } from '@/types/updates'
import { fetchUpdateStatus } from '@/utils/settings'
import { useCallback, useEffect, useState } from 'react'
import { useUpdateCheckRefresh } from './useUpdateCheckRefresh'

export function useUpdateStatus(apiKey: string): UseUpdateStatusReturn {
  const [status, setStatus] = useState<UpdateStatusPublic | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const refresh = useUpdateCheckRefresh(apiKey, setStatus, setError)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        const data = await fetchUpdateStatus()
        if (!cancelled) setStatus(data)
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

  const handleCopyText = useCallback((text: string) => {
    void navigator.clipboard.writeText(text)
  }, [])

  return { status, isLoading, error, handleCopyText, ...refresh }
}
