import type { ReactNode } from 'react'

export type DecisionTileProps = {
  readonly icon: ReactNode
  readonly title: string
  readonly badge?: ReactNode
  /** Where the chevron in the title row leads. */
  readonly href?: string
  readonly children: ReactNode
  readonly className?: string
}
