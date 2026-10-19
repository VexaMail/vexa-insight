import type { FailingSourceSummary, TriageWindow } from '@/types/dashboard'

export type FailingSourcesPanelProps = {
  readonly sources: FailingSourceSummary[]
  readonly window: TriageWindow
  readonly className?: string
}
