import type { IngestActivityPoint } from './IngestActivityPoint'
import type { IngestHealth } from './IngestHealth'

export type IngestHealthFactsProps = {
  readonly health: IngestHealth
  /** Daily ingest activity, oldest first, behind the processed sparkline. */
  readonly activity: readonly IngestActivityPoint[]
}
