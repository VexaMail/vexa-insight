import { MENU_ITEM_CLASS } from '@/constants/domains'
import type { MenuButtonItemProps } from './MenuButtonItemProps'

/** A menu row that runs an action in place. */
export function MenuButtonItem({
  icon,
  children,
  onClick,
  disabled = false,
}: Readonly<MenuButtonItemProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={MENU_ITEM_CLASS}
    >
      {icon}
      {children}
    </button>
  )
}
