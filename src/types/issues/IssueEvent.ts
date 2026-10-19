import type { IssueAction } from './IssueAction'

export type IssueEvent = {
  readonly id: number
  readonly issueKey: string
  readonly action: IssueAction
  /** Unix seconds. */
  readonly snoozedUntil: number | null
  readonly note: string | null
  readonly actorName: string | null
  /** Unix seconds. */
  readonly createdAt: number
}
