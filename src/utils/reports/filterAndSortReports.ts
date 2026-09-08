import type { ReportRow, SortDir, SortKey } from '@/types/reports'
import { compareReports } from './compareReports'

/** Client-side search across report id and organization, then sort. */
export function filterAndSortReports(
  items: readonly ReportRow[],
  search: string,
  sortKey: SortKey,
  sortDir: SortDir,
): ReportRow[] {
  const q = search.trim().toLowerCase()
  const matched =
    q === ''
      ? items
      : items.filter(
          (r) =>
            r.reportId.toLowerCase().includes(q) ||
            r.orgName.toLowerCase().includes(q),
        )

  return [...matched].sort((a, b) => {
    const cmp = compareReports(a, b, sortKey)
    return sortDir === 'desc' ? -cmp : cmp
  })
}
