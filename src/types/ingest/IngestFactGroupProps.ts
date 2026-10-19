import type { ReactNode } from 'react'

/** A titled group of ingestion health rows. */
export type IngestFactGroupProps = {
  readonly title: string
  /** One line of context next to the title. */
  readonly note?: string | undefined
  readonly children: ReactNode
}
