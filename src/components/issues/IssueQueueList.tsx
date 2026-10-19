import type { IssueQueueListProps } from './IssueQueueListProps'
import { IssueQueueRow } from './IssueQueueRow'
import { IssueRowHeader } from './IssueRowHeader'

/** Column labels and one expandable row per issue. */
export function IssueQueueList({
  issues,
  nowMs,
  impactLabel,
  emptyText,
}: Readonly<IssueQueueListProps>) {
  if (issues.length === 0) {
    return <p className="text-muted-foreground p-4 text-sm">{emptyText}</p>
  }
  return (
    <div className="@container">
      <IssueRowHeader impactLabel={impactLabel} />
      <ul className="divide-border divide-y">
        {issues.map((issue) => (
          <IssueQueueRow key={issue.id} issue={issue} nowMs={nowMs} />
        ))}
      </ul>
    </div>
  )
}
