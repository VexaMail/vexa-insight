'use client'

import SortIcon from './SortIcon'
import type { SortableHeaderButtonProps } from './SortableHeaderButtonProps'

/**
 * Column header that toggles the column's sort direction and renders the
 * matching arrow. Shared by the TanStack Table column definitions.
 */
export default function SortableHeaderButton<TData>({
  column,
  label,
}: SortableHeaderButtonProps<TData>) {
  const sorted = column.getIsSorted()

  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-1 bg-transparent p-0 text-left select-none"
      onClick={() => {
        column.toggleSorting(sorted === 'asc')
      }}
    >
      {label}
      <SortIcon
        active={sorted !== false}
        dir={sorted === 'asc' ? 'asc' : 'desc'}
      />
    </button>
  )
}
