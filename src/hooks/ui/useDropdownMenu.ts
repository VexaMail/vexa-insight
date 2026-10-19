'use client'

import { DROPDOWN_MENU_ITEM_QUERY } from '@/constants/ui'
import type { UseDropdownMenuReturn } from '@/types/ui'
import { menuItemsOf, nextMenuIndex } from '@/utils/ui'
import type { KeyboardEvent, MouseEvent } from 'react'
import { useCallback, useState } from 'react'

/**
 * Open state and keyboard model of a `DropdownMenu`: the first item takes
 * focus on open, arrows, Home and End move it, Space activates a link item,
 * Tab or choosing an item closes. Escape and the focus return to the trigger
 * come from the popover itself.
 */
export function useDropdownMenu(): UseDropdownMenuReturn {
  const [open, setOpen] = useState(false)

  const onOpenAutoFocus = useCallback((event: Event) => {
    event.preventDefault()
    if (event.target instanceof HTMLElement) {
      menuItemsOf(event.target)[0]?.focus()
    }
  }, [])

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      setOpen(false)
      return
    }
    const target = event.target
    if (event.key === ' ' && target instanceof HTMLAnchorElement) {
      event.preventDefault()
      target.click()
      return
    }
    const items = menuItemsOf(event.currentTarget)
    const current = items.findIndex((item) => item === document.activeElement)
    const next = nextMenuIndex(event.key, current, items.length)
    if (next === null) return
    event.preventDefault()
    items[next]?.focus()
  }, [])

  const onClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const target = event.target
    if (target instanceof Element && target.closest(DROPDOWN_MENU_ITEM_QUERY)) {
      setOpen(false)
    }
  }, [])

  return { open, onOpenChange: setOpen, onOpenAutoFocus, onKeyDown, onClick }
}
