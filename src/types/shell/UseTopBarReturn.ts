import type { RefObject } from 'react'

export type UseTopBarReturn = {
  readonly isProfileOpen: boolean
  readonly menuRef: RefObject<HTMLDivElement | null>
  readonly handleSignOutClick: () => void
  readonly handleToggleProfileClick: () => void
}
