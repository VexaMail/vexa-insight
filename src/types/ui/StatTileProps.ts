import type { ReactNode } from 'react'
import type { StatusTone } from './StatusTone'

export type StatTileProps = {
  readonly label: ReactNode
  readonly value: ReactNode
  /** Small line under the value: a denominator, a window, a comparison. */
  readonly hint?: ReactNode
  readonly tone?: StatusTone
  readonly icon?: ReactNode
  /** Whole tile becomes a link when set. */
  readonly href?: string
  readonly className?: string
}
