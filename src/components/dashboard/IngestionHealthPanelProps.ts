import type { IngestionHealth } from '@/types/dashboard'

export type IngestionHealthPanelProps = {
  readonly health: IngestionHealth
  readonly nowMs: number
  /** Reports per day over the window, for the processed row. */
  readonly reportsTrend: readonly number[]
  /** Admin API key; empty for viewers, who get no trigger. */
  readonly apiKey: string
  readonly className?: string
}
