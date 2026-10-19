import type { IssueState } from '@/types/issues'

/** A snooze that has run out reads as `open`, returning the issue to the queue. */
export function expireSnooze(
  state: IssueState,
  nowSeconds: number,
): IssueState {
  const expired =
    state.status === 'snoozed' && (state.snoozedUntil ?? 0) <= nowSeconds
  return expired ? { ...state, status: 'open', snoozedUntil: null } : state
}
