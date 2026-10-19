import type { ReactNode } from 'react'

export type MenuLinkItemProps = {
  readonly href: string
  readonly icon: ReactNode
  readonly children: ReactNode
  /** Opens in a new tab, outside the app. */
  readonly external?: boolean
  /** Saves the target as a file instead of opening it. */
  readonly download?: boolean
}
