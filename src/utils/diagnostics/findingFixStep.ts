import type { DiagnosticsFinding, FindingStep } from '@/types/diagnostics'

/** The change to make in DNS, or that none is needed. */
export function findingFixStep(finding: DiagnosticsFinding): FindingStep {
  if (finding.severity === 'pass') {
    return {
      key: 'fix',
      label: 'Fix',
      text: 'Nothing to change.',
      code: null,
    }
  }
  if (finding.fix !== null) {
    return {
      key: 'fix',
      label: 'Fix',
      text: `${finding.recommendation} Copy the record from More and publish it at your DNS host, replacing any TXT record already at ${finding.fix.host}.`,
      code: null,
    }
  }
  return {
    key: 'fix',
    label: 'Fix',
    text: `${finding.recommendation} The evidence tab shows the records this run read.`,
    code: null,
  }
}
