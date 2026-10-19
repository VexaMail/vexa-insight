import type { Actor } from './Actor'
import type { IssueAction } from './IssueAction'

export type RecordIssueEventInput = {
  readonly issueKey: string
  readonly action: IssueAction
  /** Unix seconds; required for `snooze`. */
  readonly snoozedUntil?: number | null
  readonly note?: string | null | undefined
  readonly actor: Actor | null
}
