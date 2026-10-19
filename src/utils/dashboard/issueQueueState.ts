import type { IssueQueueState } from '@/types/dashboard'
import type { IssueState } from '@/types/issues'

/**
 * Where an issue sits for the queue. Open, reopened and resolved-but-still-
 * detected all read as active; only an acknowledgement or a running snooze
 * takes it out of the active list.
 */
export function issueQueueState(
  state: IssueState | undefined,
): IssueQueueState {
  if (state?.status === 'acknowledged') return 'acknowledged'
  if (state?.status === 'snoozed') return 'snoozed'
  return 'active'
}
