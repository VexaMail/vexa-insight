import type { QueuedIssue } from '@/types/dashboard'
import type { ReactNode } from 'react'

export type IssueRowProps = {
  readonly issue: QueuedIssue
  readonly nowMs: number
  /** Buttons in the actions column. */
  readonly actions?: ReactNode
  /** Content below the row, such as its history. */
  readonly children?: ReactNode
  readonly className?: string
}
