import type { DiagnosticsDnsSummary } from '../../../contracts/DiagnosticsDnsSummary'
import { notConfiguredLabel } from '../notConfiguredLabel'

export function formatMtaStsSummary(dns: DiagnosticsDnsSummary): string {
  if (!dns.mtaStsRecord) return notConfiguredLabel

  return `${dns.mtaStsRecord} (valid: ${String(dns.mtaStsValid)}, policy file accessible: ${String(dns.mtaStsPolicyAccessible)}, mode: ${dns.mtaStsMode ?? 'unknown'}, policy mx: ${dns.mtaStsMxRecords.join(', ') || 'none'})`
}
