'use client'

import type { AdminApiResult, AdminCollectionState } from '@/types/settings'
import { callAdminApi } from '@/utils/settings'
import { useCallback, useEffect, useState } from 'react'

/** Loads a list from an admin API route on mount and on `reload`. */
export function useAdminCollection<T>(path: string): AdminCollectionState<T> {
  const [items, setItems] = useState<readonly T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const apply = useCallback((result: AdminApiResult<T[]>) => {
    setLoading(false)
    if (result.ok) setItems(result.data)
    setError(result.ok ? null : result.message)
  }, [])

  const reload = useCallback(async () => {
    apply(await callAdminApi<T[]>(path, 'GET'))
  }, [apply, path])

  useEffect(() => {
    void (async () => {
      const result = await callAdminApi<T[]>(path, 'GET')
      apply(result)
    })()
  }, [apply, path])

  return { items, loading, error, reload }
}
