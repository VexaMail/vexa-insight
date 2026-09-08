'use client'

import type { SortHeaderButtonProps } from './SortHeaderButtonProps'
import SortIcon from './SortIcon'

/**
 * Presentational column header: a label, the sort arrow, and a click handler.
 * Use `SortableHeaderButton` when the sort state lives on a TanStack column.
 */
export default function SortHeaderButton({
  label,
  active,
  dir,
  onSort,
}: SortHeaderButtonProps) {
  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-1 bg-transparent p-0 text-left select-none"
      onClick={onSort}
    >
      {label}
      <SortIcon active={active} dir={dir} />
    </button>
  )
}
