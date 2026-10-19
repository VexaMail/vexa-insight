import type { QueuedIssue } from '@/types/dashboard'

export type ActionQueueGroupProps = {
  readonly title: string
  readonly items: QueuedIssue[]
  readonly nowMs: number
  readonly impactLabel: string
  readonly emptyText: string
  /** Rows of this group a phone shows; the rest wait on the Issues page. */
  readonly phoneLimit: number
}
