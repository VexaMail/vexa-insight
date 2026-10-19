import type { DiagnosticsFinding, FindingStep } from '@/types/diagnostics'

/** What the check should find: the current state when it passes, else the record to publish or the target. */
export function findingExpectedStep(finding: DiagnosticsFinding): FindingStep {
  if (finding.severity === 'pass') {
    return {
      key: 'expected',
      label: 'Expected',
      text: 'What is published already meets the check.',
      code: null,
    }
  }
  if (finding.fix !== null) {
    return {
      key: 'expected',
      label: 'Expected',
      text: `A TXT record at ${finding.fix.host} with this value:`,
      code: finding.fix.value,
    }
  }
  return {
    key: 'expected',
    label: 'Expected',
    text: finding.recommendation,
    code: null,
  }
}
