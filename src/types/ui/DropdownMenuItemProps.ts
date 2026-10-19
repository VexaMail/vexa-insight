import type { ReactNode } from 'react'

export type DropdownMenuItemProps = {
  readonly children: ReactNode
  readonly icon?: ReactNode
  /** Navigates when set; the item renders as a link instead of a button. */
  readonly href?: string
  /** A link that downloads its target rather than navigating. */
  readonly download?: boolean
  /** A link that opens another site in a new tab. */
  readonly external?: boolean
  /** Runs when a button item is chosen by click, Enter or Space. */
  readonly onSelect?: () => void
  readonly disabled?: boolean
  readonly className?: string
}
