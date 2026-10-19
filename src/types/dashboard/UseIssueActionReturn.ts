import type { IssueRowAction } from './IssueRowAction'

/** State of one row's acknowledge, snooze and reopen actions. */
export type UseIssueActionReturn = {
  /** The action in flight, if any. */
  pending: IssueRowAction | null
  error: string
  isSnoozeMenuOpen: boolean
  setSnoozeMenuOpen: (open: boolean) => void
  act: (action: IssueRowAction, snoozeHours?: number) => void
}
