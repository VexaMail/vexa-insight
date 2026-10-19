import type { IssueStatus } from './IssueStatus'

export type IssueState = {
  readonly issueKey: string
  readonly status: IssueStatus
  /** Unix seconds; set while the issue is snoozed. */
  readonly snoozedUntil: number | null
  readonly lastNote: string | null
  readonly actorName: string | null
  /** Unix seconds of the last action. */
  readonly updatedAt: number
}
