import type { DiagnosticsFinding, FindingActionVerb } from '@/types/diagnostics'

/**
 * A passing check is only viewed; a record to publish or an optional
 * protocol has a guide; SPF is
 * checked against its lookup budget; anything else needs verifying.
 */
export function findingActionVerb(
  finding: DiagnosticsFinding,
): FindingActionVerb {
  if (finding.severity === 'pass') return 'View'
  if (finding.fix !== null || finding.severity === 'info') return 'Guide'
  if (finding.id === 'spf') return 'Check'
  return 'Verify'
}
