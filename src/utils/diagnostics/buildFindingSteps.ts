import type { DiagnosticsFinding, FindingStep } from '@/types/diagnostics'
import { findingExpectedStep } from './findingExpectedStep'
import { findingFixStep } from './findingFixStep'
import { findingVerifyStep } from './findingVerifyStep'

/** Observed, Expected, Fix and Verify for one finding, from the run's own data. */
export function buildFindingSteps(finding: DiagnosticsFinding): FindingStep[] {
  return [
    {
      key: 'observed',
      label: 'Observed',
      text: `${finding.state}. ${finding.detail}`,
      code: finding.observed ?? 'No record published.',
    },
    findingExpectedStep(finding),
    findingFixStep(finding),
    findingVerifyStep(finding),
  ]
}
