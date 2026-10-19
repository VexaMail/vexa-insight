'use client'

import type { IssueRowAction, UseIssueActionReturn } from '@/types/dashboard'
import { postIssueEvent } from '@/utils/dashboard'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

/**
 * Records an action on one issue, then refreshes the server-rendered queue
 * so the row moves to its new state (or leaves the home's active list).
 */
export function useIssueAction(issueKey: string): UseIssueActionReturn {
  const router = useRouter()
  const [pending, setPending] = useState<IssueRowAction | null>(null)
  const [error, setError] = useState('')
  const [isSnoozeMenuOpen, setSnoozeMenuOpen] = useState(false)

  function act(action: IssueRowAction, snoozeHours?: number): void {
    setPending(action)
    setError('')
    void (async () => {
      const result = await postIssueEvent(issueKey, action, snoozeHours ?? null)
      setPending(null)
      setSnoozeMenuOpen(false)
      if (result.ok) router.refresh()
      else setError(result.message)
    })()
  }

  return { pending, error, isSnoozeMenuOpen, setSnoozeMenuOpen, act }
}
