import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { RowData, Table } from '@tanstack/react-table'

/** Applies a combobox choice to a column; "All" clears the filter. */
export function setColumnStringFilter<TData extends RowData>(
  table: Table<typeof dataTableFeatures, TData>,
  columnId: string,
  value: string,
): void {
  table.getColumn(columnId)?.setFilterValue(value === 'All' ? undefined : value)
}
