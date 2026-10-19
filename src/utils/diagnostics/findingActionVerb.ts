import type { DiagnosticsFinding, FindingActionVerb } from '@/types/diagnostics'

/**
 * A check that needs a change is verified after fixing it; a passing or
 * purely informational one is only viewed.
 */
export function findingActionVerb(
  finding: DiagnosticsFinding,
): FindingActionVerb {
  return finding.severity === 'pass' || finding.severity === 'info'
    ? 'View'
    : 'Verify'
}
