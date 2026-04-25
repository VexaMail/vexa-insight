'use client'

import { useEffect, useRef } from 'react'

import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export function useRefreshOnCronsStop(
  isRunning: boolean,
  router: AppRouterInstance,
): void {
  const prevIsRunning = useRef(isRunning)

  useEffect(() => {
    if (prevIsRunning.current && !isRunning) {
      router.refresh()
    }
    prevIsRunning.current = isRunning
  }, [isRunning, router])
}
