import type { domainDiagnostics } from '@/lib/db'
import type { DiagnosticsOverviewCheck } from '@/types/diagnostics'

/** A stored row of `domain_diagnostics` as the index reads it. */
export function diagnosticsOverviewCheckFromRow(
  row: typeof domainDiagnostics.$inferSelect,
): DiagnosticsOverviewCheck {
  return {
    checkedAt: new Date(row.checkedAt * 1000).toISOString(),
    resolved: row.resolved,
    grade: row.grade,
    percentage: row.percentage,
    protocols: row.protocols,
  }
}
