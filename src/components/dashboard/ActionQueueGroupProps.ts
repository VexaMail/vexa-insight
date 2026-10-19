import type { QueuedIssue } from '@/types/dashboard'

export type ActionQueueGroupProps = {
  readonly title: string
  readonly items: QueuedIssue[]
  readonly nowMs: number
  readonly impactLabel: string
  readonly emptyText: string
}
