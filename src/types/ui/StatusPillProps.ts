import type { ReactNode } from 'react'
import type { StatusTone } from './StatusTone'

export type StatusPillProps = {
  readonly tone: StatusTone
  readonly children: ReactNode
  readonly dot?: boolean
  /** A small leading icon, e.g. a check or a cross on an auth result. */
  readonly icon?: ReactNode
  readonly title?: string
  /** `soft` (default) tints the tone; `solid` fills it, for severities. */
  readonly variant?: 'soft' | 'solid'
  readonly className?: string
}
