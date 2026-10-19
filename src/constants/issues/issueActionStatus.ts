import type { IssueAction, IssueStatus } from '@/types/issues'

/** The state each action leaves an issue in; a note leaves it unchanged. */
export const ISSUE_ACTION_STATUS: Record<
  Exclude<IssueAction, 'note'>,
  IssueStatus
> = {
  acknowledge: 'acknowledged',
  snooze: 'snoozed',
  reopen: 'open',
  resolve: 'resolved',
}
