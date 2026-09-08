import type { Row } from '@tanstack/react-table'

/** True when a table row carries the `id` currently selected by the caller. */
export function isSelectedTableRow<TData>(
  row: Row<TData>,
  selectedRowId: string | undefined,
): boolean {
  if (selectedRowId === undefined || row.original === null) return false
  return (
    (row.original as Record<string, unknown>)['id']?.toString() ===
    selectedRowId
  )
}
