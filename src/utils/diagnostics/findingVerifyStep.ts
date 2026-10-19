import type { DiagnosticsFinding, FindingStep } from '@/types/diagnostics'

/** How to confirm the change: query the record, then re-run the checks. */
export function findingVerifyStep(finding: DiagnosticsFinding): FindingStep {
  if (finding.severity === 'pass') {
    return {
      key: 'verify',
      label: 'Verify',
      text: 'Re-run diagnostics after any DNS change to confirm it still passes.',
      code: null,
    }
  }
  return {
    key: 'verify',
    label: 'Verify',
    text: 'Once the change has propagated (up to the record TTL), query it and re-run diagnostics; this check should then pass.',
    code: finding.fix === null ? null : `dig +short TXT ${finding.fix.host}`,
  }
}
