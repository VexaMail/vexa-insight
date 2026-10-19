import type { FailingSourceSummary, TriageWindow } from '@/types/dashboard'

export type FailingSourcesPanelProps = {
  readonly sources: FailingSourceSummary[]
  /** Failing messages per day, keyed by IP. */
  readonly trends: Readonly<Record<string, number[]>>
  readonly window: TriageWindow
  readonly className?: string
}
