'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

/** Sets or clears one query parameter in place, without scrolling. */
export function useUrlParamUpdater(): (key: string, value: string) => void {
  const searchParams = useSearchParams()
  const router = useRouter()

  return useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) params.set(key, value)
      else params.delete(key)
      router.replace(`?${params.toString()}`, { scroll: false })
    },
    [searchParams, router],
  )
}
