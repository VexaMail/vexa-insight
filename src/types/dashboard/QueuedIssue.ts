import type { ActionItem } from './ActionItem'
import type { IssueQueueState } from './IssueQueueState'

/** A derived issue with the operator state recorded against its key. */
export type QueuedIssue = ActionItem & {
  state: IssueQueueState
  /** Unix seconds; set while snoozed. */
  snoozedUntil: number | null
  /** Who acted last and when (unix seconds); null when nobody has. */
  actedBy: string | null
  actedAt: number | null
  /** Whether the viewer may acknowledge, snooze or reopen it. */
  canAct: boolean
}
