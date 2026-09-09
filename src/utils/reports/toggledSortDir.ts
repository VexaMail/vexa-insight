import type { ReportsTableState, SortDir, SortKey } from '@/types/reports'

/**
 * Sorting the current key again flips descending to ascending; any other key
 * starts descending.
 */
export function toggledSortDir(
  state: ReportsTableState,
  key: SortKey,
): SortDir {
  return state.sortKey === key && state.sortDir === 'desc' ? 'asc' : 'desc'
}
