import { diagnosticsOverviewConcurrency } from '@/constants/diagnostics'
import { getAllowedDomainIds } from '@/services/auth'
import type { DiagnosticsOverviewRow } from '@/types/diagnostics'
import { resolveWithConcurrency } from '@/utils/diagnostics'
import { listDiagnosticsOverviewRows } from './listDiagnosticsOverviewRows'
import { runDiagnosticsOverviewCheck } from './runDiagnosticsOverviewCheck'

/**
 * Runs the DNS checks of the requested domains the caller may see, stores
 * them, and returns their rows. Unknown or hidden ids are left out.
 */
export async function refreshDiagnosticsOverview(
  domainIds: readonly number[],
): Promise<DiagnosticsOverviewRow[]> {
  const allowed = await getAllowedDomainIds()
  const visible =
    allowed === null
      ? domainIds
      : domainIds.filter((id) => allowed.includes(id))
  const rows = await listDiagnosticsOverviewRows(visible)
  return resolveWithConcurrency(
    rows,
    diagnosticsOverviewConcurrency,
    async (row) => ({
      ...row,
      check: await runDiagnosticsOverviewCheck(row.domainId, row.domainName),
    }),
  )
}
