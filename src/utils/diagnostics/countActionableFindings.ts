import type { DiagnosticsFinding } from '@/types/diagnostics'

/** Findings that ask for a change: everything but `pass` and `info`. */
export function countActionableFindings(
  findings: readonly DiagnosticsFinding[],
): number {
  return findings.filter(
    (finding) => finding.severity !== 'pass' && finding.severity !== 'info',
  ).length
}
