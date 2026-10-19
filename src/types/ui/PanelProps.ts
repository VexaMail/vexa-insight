import type { ReactNode } from 'react'

export type PanelProps = {
  readonly title?: ReactNode
  readonly description?: ReactNode
  readonly icon?: ReactNode
  /** Right side of the header: a "View all" link, a filter, an action. */
  readonly actions?: ReactNode
  readonly children: ReactNode
  readonly className?: string
  /** Drop the body padding for edge-to-edge tables. */
  readonly flush?: boolean
}
