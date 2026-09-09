import type { Table } from '@tanstack/react-table'

/** Applies a combobox choice to a column; "All" clears the filter. */
export function setColumnStringFilter<TData>(
  table: Table<TData>,
  columnId: string,
  value: string,
): void {
  table.getColumn(columnId)?.setFilterValue(value === 'All' ? undefined : value)
}
