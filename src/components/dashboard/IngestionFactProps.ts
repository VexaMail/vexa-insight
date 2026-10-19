import type { ReactNode } from 'react'

export type IngestionFactProps = {
  readonly label: string
  readonly children: ReactNode
  /** Secondary fact on the right, e.g. the next run or a duration. */
  readonly aside?: ReactNode
}
