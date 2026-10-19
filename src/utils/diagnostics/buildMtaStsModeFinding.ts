import type { DiagnosticsFinding, DnsDiagnostics } from '@/types/diagnostics'
import { mtaStsFindingBase } from './mtaStsFindingBase'

/** A served policy, judged by its mode. */
export function buildMtaStsModeFinding(
  dns: DnsDiagnostics,
): DiagnosticsFinding {
  const mode = dns.mtaSts.mode ?? 'unknown'
  const mx = `${String(dns.mtaSts.mxRecords.length)} MX in policy`
  if (mode === 'enforce') {
    return {
      ...mtaStsFindingBase(dns),
      severity: 'pass',
      state: 'mode: enforce',
      detail: `Senders that support MTA-STS refuse to deliver without valid TLS. ${mx}.`,
      recommendation:
        'No change needed. Update the policy id whenever the MX hosts change.',
      fix: null,
      tileValue: 'Enforce',
      tileHint: mx,
    }
  }
  return {
    ...mtaStsFindingBase(dns),
    severity: 'low',
    state: `mode: ${mode}`,
    detail: 'Senders report TLS failures but still deliver without TLS.',
    recommendation:
      'Switch to mode: enforce once the TLS reports show no failures.',
    fix: null,
    tileValue: mode === 'testing' ? 'Testing' : 'Not enforced',
    tileHint: mx,
  }
}
