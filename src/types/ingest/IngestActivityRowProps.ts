import type { IngestActivityPoint } from './IngestActivityPoint'

export type IngestActivityRowProps = {
  /** Daily ingest activity, oldest first. */
  readonly activity: readonly IngestActivityPoint[]
}
