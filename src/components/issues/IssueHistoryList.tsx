import { formatDateTime, issueEventLabel } from '@/utils/dashboard'
import type { IssueHistoryListProps } from './IssueHistoryListProps'

/** The operator actions recorded on one issue, oldest first. */
export function IssueHistoryList({ history }: Readonly<IssueHistoryListProps>) {
  if (history.status === 'loading') {
    return <p className="text-muted-foreground text-xs">Loading history...</p>
  }
  if (history.status === 'error') {
    return <p className="text-danger text-xs">Could not load the history.</p>
  }
  if (history.events.length === 0) {
    return (
      <p className="text-muted-foreground text-xs">
        Nobody has acted on this issue yet.
      </p>
    )
  }
  return (
    <ol className="border-border space-y-2 border-l pl-3">
      {history.events.map((event) => (
        <li key={event.id} className="text-xs">
          <span className="text-foreground font-medium">
            {issueEventLabel(event)}
          </span>
          <span className="text-muted-foreground">
            {' '}
            by {event.actorName ?? 'API key'},{' '}
            <span className="font-mono">
              {formatDateTime(event.createdAt * 1000)}
            </span>
          </span>
          {event.note ? (
            <span className="text-muted-foreground block">{event.note}</span>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
