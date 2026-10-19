import type { ReactNode } from 'react'

export type DecisionTileProps = {
  readonly icon: ReactNode
  readonly title: string
  readonly badge?: ReactNode
  readonly children: ReactNode
  readonly className?: string
}
