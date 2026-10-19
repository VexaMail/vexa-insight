import type { IssueEvent } from '@/types/issues'
import type { TimelineEvent } from '@/types/timeline'

/** An operator action on an issue as a timeline entry. */
export function issueEventToTimelineEvent(event: IssueEvent): TimelineEvent {
  const who = event.actorName ? ` by ${event.actorName}` : ''
  return {
    at: event.createdAt,
    kind: 'issue_action',
    title: `Issue ${event.action === 'note' ? 'note' : `${event.action}d`}${who}`,
    detail: event.note ?? event.issueKey,
    href: null,
  }
}
