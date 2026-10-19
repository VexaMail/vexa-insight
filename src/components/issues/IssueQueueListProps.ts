import type { QueuedIssue } from '@/types/dashboard'

export type IssueQueueListProps = {
  readonly issues: QueuedIssue[]
  readonly nowMs: number
  readonly impactLabel: string
  readonly emptyText: string
}
