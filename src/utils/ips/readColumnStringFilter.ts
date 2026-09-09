import type { Table } from '@tanstack/react-table'

/** The column's string filter, or "All" when unset or not a string. */
export function readColumnStringFilter<TData>(
  table: Table<TData>,
  columnId: string,
): string {
  const value = table.getColumn(columnId)?.getFilterValue()
  return typeof value === 'string' ? value : 'All'
}
