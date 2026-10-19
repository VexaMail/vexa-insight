import type { QueuedIssue, TriageWindow } from '@/types/dashboard'

export type ActionQueuePanelProps = {
  readonly items: QueuedIssue[]
  /** Acknowledged or snoozed issues left out of the list. */
  readonly parked: number
  readonly window: TriageWindow
  readonly nowMs: number
  readonly className?: string
}
