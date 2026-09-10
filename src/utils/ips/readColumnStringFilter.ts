import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { RowData, Table } from '@tanstack/react-table'

/** The column's string filter, or "All" when unset or not a string. */
export function readColumnStringFilter<TData extends RowData>(
  table: Table<typeof dataTableFeatures, TData>,
  columnId: string,
): string {
  const value = table.getColumn(columnId)?.getFilterValue()
  return typeof value === 'string' ? value : 'All'
}
