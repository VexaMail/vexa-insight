import { domainDiagnostics, getDb } from '@/lib/db'
import type { DiagnosticsOverviewCheck } from '@/types/diagnostics'

/** Keeps a domain's latest DNS run for the diagnostics index. */
export async function storeDiagnosticsOverviewCheck(
  domainId: number,
  check: DiagnosticsOverviewCheck,
): Promise<void> {
  const values = {
    checkedAt: Math.floor(Date.parse(check.checkedAt) / 1000),
    resolved: check.resolved,
    grade: check.grade,
    percentage: check.percentage,
    protocols: [...check.protocols],
  }
  await getDb()
    .insert(domainDiagnostics)
    .values({ domainId, ...values })
    .onConflictDoUpdate({ target: domainDiagnostics.domainId, set: values })
}
