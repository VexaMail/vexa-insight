import { getAllowedDomainIds } from '@/services/auth'
import type { DiagnosticsOverviewRow } from '@/types/diagnostics'
import { listDiagnosticsOverviewRows } from './listDiagnosticsOverviewRows'

/**
 * Every visible domain with its stored DNS run, lowest score first and the
 * never-checked ones last. Runs no lookup: the page refreshes stale rows from
 * the browser, a batch at a time.
 */
export async function loadDiagnosticsOverview(): Promise<
  DiagnosticsOverviewRow[]
> {
  const rows = await listDiagnosticsOverviewRows(await getAllowedDomainIds())
  const rank = (row: DiagnosticsOverviewRow) =>
    row.check ? (row.check.resolved ? row.check.percentage : 101) : 102
  return rows.toSorted(
    (left, right) =>
      rank(left) - rank(right) ||
      left.domainName.localeCompare(right.domainName),
  )
}
