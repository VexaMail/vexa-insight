'use client'

import SortHeaderButton from './SortHeaderButton'
import type { SortableHeaderButtonProps } from './SortableHeaderButtonProps'

/**
 * Column header driven by a TanStack column's own sort state. Toggles the
 * column and renders the matching arrow.
 */
export default function SortableHeaderButton<TData>({
  column,
  label,
  descendingFirst = false,
}: SortableHeaderButtonProps<TData>) {
  const sorted = column.getIsSorted()

  return (
    <SortHeaderButton
      label={label}
      active={sorted !== false}
      dir={sorted === 'asc' ? 'asc' : 'desc'}
      onSort={() => {
        column.toggleSorting(
          descendingFirst ? sorted !== 'desc' : sorted === 'asc',
        )
      }}
    />
  )
}
