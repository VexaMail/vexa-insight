'use client'

import type { UseUpdateCheckRefreshReturn } from '@/types/settings'
import type { UpdateStatusPublic } from '@/types/updates'
import { postUpdateCheck } from '@/utils/settings'
import { useCallback, useState } from 'react'

/** The manual "check now" request behind the refresh button. */
export function useUpdateCheckRefresh(
  apiKey: string,
  setStatus: (status: UpdateStatusPublic) => void,
  setError: (error: string | null) => void,
): UseUpdateCheckRefreshReturn {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refresh = useCallback(
    async (token: string) => {
      setIsRefreshing(true)
      setError(null)
      try {
        setStatus(await postUpdateCheck(token))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsRefreshing(false)
      }
    },
    [setStatus, setError],
  )

  const handleRefreshClick = useCallback(() => {
    if (!apiKey.trim()) return
    void refresh(apiKey)
  }, [apiKey, refresh])

  return { isRefreshing, handleRefreshClick }
}
