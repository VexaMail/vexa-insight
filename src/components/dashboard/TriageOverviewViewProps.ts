import type { TriageOverview } from '@/types/dashboard'

export type TriageOverviewViewProps = {
  readonly overview: TriageOverview
  readonly nowMs: number
  readonly apiKey: string
}
