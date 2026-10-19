import type { KeyboardEvent, MouseEvent } from 'react'

export type UseDropdownMenuReturn = {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
  /** Focuses the first item instead of the content box. */
  readonly onOpenAutoFocus: (event: Event) => void
  /** Arrow, Home, End, Space and Tab handling inside the menu. */
  readonly onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void
  /** Closes the menu once an enabled item has been chosen. */
  readonly onClick: (event: MouseEvent<HTMLDivElement>) => void
}
