import type { RefObject } from 'react'

export type ProfileMenuProps = {
  readonly isOpen: boolean
  readonly menuRef: RefObject<HTMLDivElement | null>
  readonly onToggle: () => void
  readonly onSignOut: () => void
}
