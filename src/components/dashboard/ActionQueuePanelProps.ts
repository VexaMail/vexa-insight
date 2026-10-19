import type { ActionItem, TriageWindow } from '@/types/dashboard'

export type ActionQueuePanelProps = {
  readonly items: ActionItem[]
  readonly window: TriageWindow
  readonly className?: string
}
