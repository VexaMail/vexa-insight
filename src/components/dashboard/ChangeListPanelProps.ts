import type { ChangeItem, TriageWindow } from '@/types/dashboard'

export type ChangeListPanelProps = {
  readonly items: ChangeItem[]
  readonly window: TriageWindow
  readonly className?: string
}
