import type { ReactNode } from 'react'

export type DropdownMenuProps = {
  /** What the trigger button shows: a label, an icon, or both. */
  readonly trigger: ReactNode
  /** Accessible name of the menu, and of the trigger when it is icon-only. */
  readonly label: string
  /** Set when the trigger has no visible text, e.g. a kebab icon. */
  readonly iconOnly?: boolean
  readonly triggerClassName?: string
  readonly contentClassName?: string
  readonly align?: 'start' | 'center' | 'end'
  /** `DropdownMenuItem`s. */
  readonly children: ReactNode
}
