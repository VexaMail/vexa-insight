import type { DiagnosticsOverviewRow } from '@/types/diagnostics'

/** The rows with each updated domain replaced, keeping their order. */
export function mergeDiagnosticsOverviewRows(
  rows: readonly DiagnosticsOverviewRow[],
  updates: readonly DiagnosticsOverviewRow[],
): DiagnosticsOverviewRow[] {
  if (updates.length === 0) return [...rows]
  const byId = new Map(updates.map((row) => [row.domainId, row]))
  return rows.map((row) => byId.get(row.domainId) ?? row)
}
