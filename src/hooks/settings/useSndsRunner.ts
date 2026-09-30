'use client'

import type { UseSndsRunnerReturn } from '@/types/settings'
import { useState } from 'react'

/** Busy flag and status message shared by the SNDS card's actions. */
export function useSndsRunner(): UseSndsRunnerReturn {
  const [isBusy, setIsBusy] = useState(false)
  const [message, setMessage] = useState('')

  function run(action: () => Promise<void>): void {
    setIsBusy(true)
    setMessage('')
    void (async () => {
      try {
        await action()
      } finally {
        setIsBusy(false)
      }
    })()
  }

  return { isBusy, message, setMessage, run }
}
