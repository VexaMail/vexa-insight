import type { QueuedIssue } from '@/types/dashboard'

export type IssueQueueRowProps = {
  readonly issue: QueuedIssue
  readonly nowMs: number
}
