import type {
  DiagnosticsFindingsInput,
  DiagnosticsOverviewCheck,
} from '@/types/diagnostics'
import {
  buildDiagnosticsFindings,
  toDiagnosticsProtocolState,
} from '@/utils/diagnostics'
import { computeDomainScore } from './computeDomainScore'

/** Reduces one DNS run to the score and protocol states the index shows. */
export function buildDiagnosticsOverviewCheck(
  input: DiagnosticsFindingsInput,
): DiagnosticsOverviewCheck {
  const score = computeDomainScore(input.dns)
  return {
    checkedAt: input.checkedAt,
    resolved: input.dns.nsRecords.length > 0,
    grade: score.grade,
    percentage: score.percentage,
    protocols: buildDiagnosticsFindings(input).map(toDiagnosticsProtocolState),
  }
}
