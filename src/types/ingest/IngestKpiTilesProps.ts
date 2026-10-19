import type { IngestActivityPoint } from './IngestActivityPoint'
import type { IngestHealth } from './IngestHealth'

export type IngestKpiTilesProps = {
  readonly health: IngestHealth
  readonly activity: readonly IngestActivityPoint[]
}
