import type { ReactNode } from 'react'

export type TileLinkButtonProps = {
  readonly href: string
  readonly children: ReactNode
  /** `outline` (default) for a secondary step, `info` for the main one. */
  readonly variant?: 'outline' | 'info'
  readonly className?: string
}
