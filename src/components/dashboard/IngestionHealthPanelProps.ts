import type { IngestionHealth } from '@/types/dashboard'

export type IngestionHealthPanelProps = {
  readonly health: IngestionHealth
  readonly nowMs: number
  /** Admin API key; empty for viewers, who get no trigger. */
  readonly apiKey: string
  readonly className?: string
}
