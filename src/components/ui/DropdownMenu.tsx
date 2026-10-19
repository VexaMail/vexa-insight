'use client'

import { useDropdownMenu } from '@/hooks/ui'
import { cn } from '@/lib/utils'
import type { DropdownMenuProps } from '@/types/ui'
import { Popover } from './popover'
import { PopoverContent } from './PopoverContent'
import { PopoverTrigger } from './PopoverTrigger'

/**
 * A button that opens a list of actions or links. Keyboard: the first item
 * takes focus, arrows, Home and End move between items, Enter or Space
 * chooses one, Escape closes and returns focus to the button.
 */
export function DropdownMenu({
  trigger,
  label,
  iconOnly = false,
  triggerClassName,
  contentClassName,
  align = 'end',
  children,
}: Readonly<DropdownMenuProps>) {
  const menu = useDropdownMenu()
  return (
    <Popover open={menu.open} onOpenChange={menu.onOpenChange}>
      <PopoverTrigger
        aria-haspopup="menu"
        {...(iconOnly ? { 'aria-label': label } : {})}
        className={cn('cursor-pointer', triggerClassName)}
      >
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        role="menu"
        aria-label={label}
        align={align}
        onOpenAutoFocus={menu.onOpenAutoFocus}
        onKeyDown={menu.onKeyDown}
        onClick={menu.onClick}
        className={cn('flex w-56 flex-col gap-0.5 p-1.5', contentClassName)}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}
