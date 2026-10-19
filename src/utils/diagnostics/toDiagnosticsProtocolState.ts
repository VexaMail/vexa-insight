import type {
  DiagnosticsFinding,
  DiagnosticsProtocolState,
} from '@/types/diagnostics'

/** The fields of a finding the diagnostics index keeps. */
export function toDiagnosticsProtocolState(
  finding: DiagnosticsFinding,
): DiagnosticsProtocolState {
  return {
    id: finding.id,
    protocol: finding.protocol,
    severity: finding.severity,
    state: finding.state,
    tileValue: finding.tileValue,
  }
}
