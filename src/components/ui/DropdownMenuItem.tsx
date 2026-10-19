import { DROPDOWN_MENU_ITEM_CLASS } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { DropdownMenuItemProps } from '@/types/ui'
import { DropdownMenuLinkItem } from './DropdownMenuLinkItem'

/** One choice of a `DropdownMenu`: a link with `href`, a button otherwise. */
export function DropdownMenuItem(props: Readonly<DropdownMenuItemProps>) {
  if (props.href !== undefined) {
    return <DropdownMenuLinkItem {...props} href={props.href} />
  }
  const { icon, children, onSelect, disabled = false, className } = props
  return (
    <button
      type="button"
      role="menuitem"
      tabIndex={-1}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onSelect}
      className={cn(DROPDOWN_MENU_ITEM_CLASS, className)}
    >
      {icon}
      {children}
    </button>
  )
}
