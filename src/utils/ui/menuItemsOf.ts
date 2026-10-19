import { DROPDOWN_MENU_ITEM_QUERY } from '@/constants/ui'

/** The enabled items of a menu, in document order. */
export function menuItemsOf(menu: HTMLElement): HTMLElement[] {
  return Array.from(
    menu.querySelectorAll<HTMLElement>(DROPDOWN_MENU_ITEM_QUERY),
  )
}
