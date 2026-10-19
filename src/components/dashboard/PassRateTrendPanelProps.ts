import type { RateTrendPoint, TriageWindow } from '@/types/dashboard'

export type PassRateTrendPanelProps = {
  readonly points: RateTrendPoint[]
  readonly window: TriageWindow
  readonly className?: string
}
