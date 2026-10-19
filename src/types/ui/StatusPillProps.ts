import type { ReactNode } from 'react'
import type { StatusPillVariant } from './StatusPillVariant'
import type { StatusTone } from './StatusTone'

export type StatusPillProps = {
  readonly tone: StatusTone
  readonly children: ReactNode
  readonly dot?: boolean
  /** A small leading icon, e.g. a check or a cross on an auth result. */
  readonly icon?: ReactNode
  readonly title?: string
  /**
   * `solid` fills the tone: only for a severity that asks for action
   * (critical, high, medium, warning) and for the pass/fail verdict of a
   * check. `soft` (default) tints it: states, categories, policies,
   * freshness and every other descriptive label. See docs/design-system.md.
   */
  readonly variant?: StatusPillVariant
  readonly className?: string
}
