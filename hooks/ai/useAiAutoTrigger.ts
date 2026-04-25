'use client'

import { useEffect, useRef } from 'react'

/**
 * Auto-triggers AI fetch on mount, idempotent per reportId.
 */
export function useAiAutoTrigger(
  reportId: number,
  hasEvents: boolean,
  fetchInsights: () => Promise<void>,
): void {
  const triggeredForRef = useRef<number | null>(null)

  useEffect(() => {
    if (!hasEvents) return
    if (triggeredForRef.current === reportId) return
    triggeredForRef.current = reportId
    void fetchInsights()
  }, [reportId, hasEvents, fetchInsights])
}
