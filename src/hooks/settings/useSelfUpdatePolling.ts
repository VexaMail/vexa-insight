'use client'

import { SELF_UPDATE_POLL_MS } from '@/constants/updates'
import { useEffect } from 'react'

/** Loads once, then keeps reloading while the update log is still running. */
export function useSelfUpdatePolling(
  running: boolean | undefined,
  load: () => Promise<void>,
): void {
  useEffect(() => {
    void (async () => {
      await load()
    })()
  }, [load])

  // While an update is running the log grows, so poll until it stops.
  useEffect(() => {
    if (!running) return

    const timer = setInterval(() => {
      void load()
    }, SELF_UPDATE_POLL_MS)

    return () => {
      clearInterval(timer)
    }
  }, [running, load])
}
