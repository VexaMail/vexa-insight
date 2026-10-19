import type { IngestionHealth } from '@/types/dashboard'

export type IngestionFactsProps = {
  readonly health: IngestionHealth
  readonly nowMs: number
}
