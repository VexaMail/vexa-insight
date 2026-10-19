import type { DiagnosticsOverviewRow } from '@/types/diagnostics'

/**
 * Ids of the domains whose last DNS run is missing or older than `maxAgeMs`,
 * never-checked first and then oldest first, so the rows with nothing to show
 * fill in before the ones that only need refreshing.
 */
export function staleDiagnosticsDomainIds(
  rows: readonly DiagnosticsOverviewRow[],
  nowMs: number,
  maxAgeMs: number,
): number[] {
  const checkedMs = (row: DiagnosticsOverviewRow) =>
    row.check ? Date.parse(row.check.checkedAt) : 0
  return rows
    .filter((row) => nowMs - checkedMs(row) > maxAgeMs)
    .toSorted((left, right) => checkedMs(left) - checkedMs(right))
    .map((row) => row.domainId)
}
