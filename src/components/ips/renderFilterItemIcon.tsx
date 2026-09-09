import type { ReactNode } from 'react'
import type { FilterComboboxItem } from './FilterComboboxItem'

/** The item's flag or icon when it has a code and the combobox renders icons. */
export function renderFilterItemIcon(
  item: FilterComboboxItem,
  renderIcon: ((code: string) => ReactNode) | undefined,
): ReactNode {
  if (item.code === undefined || item.code === '' || renderIcon === undefined) {
    return null
  }
  return renderIcon(item.code)
}
