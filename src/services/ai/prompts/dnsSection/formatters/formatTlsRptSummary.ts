import type { DiagnosticsDnsSummary } from '../../../contracts/DiagnosticsDnsSummary'
import { notConfiguredLabel } from '../notConfiguredLabel'

export function formatTlsRptSummary(dns: DiagnosticsDnsSummary): string {
  if (!dns.tlsRptRecord) return notConfiguredLabel

  return `${dns.tlsRptRecord} (valid: ${String(dns.tlsRptValid)}, rua: ${dns.tlsRptRuaAddresses.join(', ') || 'none'})`
}
