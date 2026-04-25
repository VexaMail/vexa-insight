'use client'

import { useEffect, useState } from 'react'

/**
 * Returns true when AI analysis has been loading for longer than timeoutMs.
 * Uses the status value as a key to reset state via a separate effect.
 */
export function useAiTimeout(status: string, timeoutMs = 15_000): boolean {
  const [isTimedOut, setIsTimedOut] = useState(false)

  // Start a timeout when status enters 'loading'.
  // The cleanup resets state when the effect re-runs or unmounts.
  useEffect(() => {
    if (status !== 'loading') {
      return
    }

    const timer = setTimeout(() => {
      setIsTimedOut(true)
    }, timeoutMs)

    return () => {
      clearTimeout(timer)
      setIsTimedOut(false)
    }
  }, [status, timeoutMs])

  return isTimedOut
}
