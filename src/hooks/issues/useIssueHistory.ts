'use client'

import type { UseIssueHistoryReturn } from '@/types/dashboard'
import type { IssueEvent } from '@/types/issues'
import { fetchIssueHistory } from '@/utils/dashboard'
import { useState } from 'react'

/** Opens and closes an issue's history, fetching it the first time. */
export function useIssueHistory(issueKey: string): UseIssueHistoryReturn {
  const [isOpen, setOpen] = useState(false)
  const [status, setStatus] = useState<UseIssueHistoryReturn['status']>('idle')
  const [events, setEvents] = useState<IssueEvent[]>([])

  function toggle(): void {
    setOpen(!isOpen)
    if (isOpen || status === 'loading' || status === 'ready') return
    setStatus('loading')
    void (async () => {
      const loaded = await fetchIssueHistory(issueKey)
      setEvents(loaded ?? [])
      setStatus(loaded ? 'ready' : 'error')
    })()
  }

  return { isOpen, status, events, toggle }
}
