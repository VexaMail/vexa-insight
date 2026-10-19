import { findingSeverityRanks } from '@/constants/diagnostics'
import type {
  DiagnosticsFinding,
  DiagnosticsFindingsInput,
} from '@/types/diagnostics'
import { buildBimiFinding } from './buildBimiFinding'
import { buildDkimFinding } from './buildDkimFinding'
import { buildDmarcFinding } from './buildDmarcFinding'
import { buildMtaStsFinding } from './buildMtaStsFinding'
import { buildSpfFinding } from './buildSpfFinding'
import { buildTlsRptFinding } from './buildTlsRptFinding'

/** One finding per protocol, most urgent first. */
export function buildDiagnosticsFindings(
  input: DiagnosticsFindingsInput,
): DiagnosticsFinding[] {
  const { dns } = input
  return [
    buildDmarcFinding(dns),
    buildSpfFinding(dns),
    buildDkimFinding(dns),
    buildMtaStsFinding(input),
    buildTlsRptFinding(dns),
    buildBimiFinding(dns),
  ].toSorted(
    (left, right) =>
      findingSeverityRanks[left.severity] -
      findingSeverityRanks[right.severity],
  )
}
