import type { IngestRunHealth } from './IngestRunHealth'

/** The part of the run health that comes from the newest run alone. */
export type LastRunHealth = Pick<
  IngestRunHealth,
  | 'lastRunAt'
  | 'lastRunSuccess'
  | 'lastProcessed'
  | 'lastIngested'
  | 'lastErrorCount'
  | 'lastErrorSummary'
>
