import type { RateTrendPoint, TriageWindow } from '@/types/dashboard'

export type PassRateTrendPanelProps = {
  readonly points: RateTrendPoint[]
  /** The page's window, which the range picker falls back to. */
  readonly window: TriageWindow
  /** The chart's own window, e.g. "last 90 days". */
  readonly trendLabel: string
  readonly className?: string
}
