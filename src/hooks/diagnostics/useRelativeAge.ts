'use client'

import { useEffect, useState } from 'react'

import { formatRelativeAge } from '@/utils/diagnostics'

/** How long ago `iso` was, refreshed every 30 seconds while the page is open. */
export function useRelativeAge(iso: string): string {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now())
    }, 30_000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return formatRelativeAge(iso, now)
}
