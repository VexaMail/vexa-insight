import type { ReactNode } from 'react'

/** One row of the ingestion health table: label, value, and a side note. */
export type IngestFactRowProps = {
  readonly label: string
  readonly children: ReactNode
  /** Right-hand context: next run, last report, a sparkline. */
  readonly aside?: ReactNode
}
