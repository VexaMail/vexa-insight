'use client'

import { useIssueHistory } from '@/hooks/issues'
import { History } from 'lucide-react'
import { IssueHistoryList } from './IssueHistoryList'
import { IssueIconButton } from './IssueIconButton'
import type { IssueQueueRowProps } from './IssueQueueRowProps'
import { IssueRow } from './IssueRow'
import { IssueRowActions } from './IssueRowActions'

/** An issues-page row: the queue row plus its expandable action history. */
export function IssueQueueRow({ issue, nowMs }: Readonly<IssueQueueRowProps>) {
  const history = useIssueHistory(issue.id)
  const panelId = `issue-history-${issue.id}`
  return (
    <IssueRow
      issue={issue}
      nowMs={nowMs}
      actions={
        <>
          {issue.canAct ? <IssueRowActions issue={issue} /> : null}
          <IssueIconButton
            label={`History: ${issue.issue}`}
            aria-expanded={history.isOpen}
            aria-controls={panelId}
            className={history.isOpen ? 'bg-accent text-foreground' : ''}
            onClick={history.toggle}
          >
            <History aria-hidden />
          </IssueIconButton>
        </>
      }
    >
      {history.isOpen ? (
        <div id={panelId} className="relative z-10 px-4 pb-3 @xl:pl-[112px]">
          <IssueHistoryList history={history} />
        </div>
      ) : null}
    </IssueRow>
  )
}
