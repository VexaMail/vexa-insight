import type { IngestionHealth } from './IngestionHealth'

/** The latest-run part of the ingestion panel. */
export type LastRunFacts = Pick<
  IngestionHealth,
  | 'lastRunAtMs'
  | 'lastRunSuccess'
  | 'lastRunProcessed'
  | 'lastRunIngested'
  | 'lastRunError'
>
