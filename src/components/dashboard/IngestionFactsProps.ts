import type { IngestionHealth } from '@/types/dashboard'

export type IngestionFactsProps = {
  readonly health: IngestionHealth
  readonly nowMs: number
  /** Reports per day over the window, for the processed row. */
  readonly reportsTrend: readonly number[]
}
