'use client'

import { useIssueAction } from '@/hooks/issues'
import { Check, RotateCcw } from 'lucide-react'
import { IssueIconButton } from './IssueIconButton'
import type { IssueRowActionsProps } from './IssueRowActionsProps'
import { IssueSnoozeMenu } from './IssueSnoozeMenu'

/**
 * Acknowledge and snooze an active issue, or reopen one that was parked.
 * Rendered only when the viewer may act; the API checks again.
 */
export function IssueRowActions({ issue }: Readonly<IssueRowActionsProps>) {
  const action = useIssueAction(issue.id)
  const isBusy = action.pending !== null
  return (
    <>
      {issue.state === 'active' ? (
        <>
          <IssueIconButton
            label={`Acknowledge: ${issue.issue}`}
            disabled={isBusy}
            onClick={() => {
              action.act('acknowledge')
            }}
          >
            <Check aria-hidden />
          </IssueIconButton>
          <IssueSnoozeMenu action={action} issueTitle={issue.issue} />
        </>
      ) : (
        <IssueIconButton
          label={`Reopen: ${issue.issue}`}
          disabled={isBusy}
          onClick={() => {
            action.act('reopen')
          }}
        >
          <RotateCcw aria-hidden />
        </IssueIconButton>
      )}
      {action.error ? (
        <span
          role="alert"
          className="text-danger absolute top-full right-0 mt-0.5 text-[11px] whitespace-nowrap"
        >
          {action.error}
        </span>
      ) : null}
    </>
  )
}
