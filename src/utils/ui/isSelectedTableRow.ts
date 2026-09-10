import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { Row, RowData } from '@tanstack/react-table'

/** True when a table row carries the `id` currently selected by the caller. */
export function isSelectedTableRow<TData extends RowData>(
  row: Row<typeof dataTableFeatures, TData>,
  selectedRowId: string | undefined,
): boolean {
  if (selectedRowId === undefined) return false
  return (
    (row.original as Record<string, unknown>)['id']?.toString() ===
    selectedRowId
  )
}
