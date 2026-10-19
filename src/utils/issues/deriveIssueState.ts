import { ISSUE_ACTION_STATUS } from '@/constants/issues'
import type { IssueEvent, IssueState } from '@/types/issues'
import { expireSnooze } from './expireSnooze'

/**
 * The current state of one issue from its events, oldest first, or null when
 * nobody has acted on it. A note never changes the state but is kept as the
 * latest note.
 */
export function deriveIssueState(
  issueKey: string,
  events: readonly IssueEvent[],
  nowSeconds: number,
): IssueState | null {
  let state: IssueState | null = null
  let lastNote: string | null = null
  for (const event of events) {
    if (event.note) lastNote = event.note
    if (event.action === 'note') continue
    state = {
      issueKey,
      status: ISSUE_ACTION_STATUS[event.action],
      snoozedUntil: event.action === 'snooze' ? event.snoozedUntil : null,
      lastNote,
      actorName: event.actorName,
      updatedAt: event.createdAt,
    }
  }
  return state ? expireSnooze({ ...state, lastNote }, nowSeconds) : null
}
