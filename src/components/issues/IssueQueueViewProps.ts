import type { QueuedIssue } from '@/types/dashboard'

export type IssueQueueViewProps = {
  readonly issues: QueuedIssue[]
  readonly nowMs: number
  /** e.g. "last 30 days". */
  readonly windowLabel: string
  /** e.g. "Impact (30d)". */
  readonly impactLabel: string
}
