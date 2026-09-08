import type { DiagnosticsDnsSummary } from '../../../contracts/DiagnosticsDnsSummary'
import { notConfiguredLabel } from '../notConfiguredLabel'

export function formatBimiSummary(dns: DiagnosticsDnsSummary): string {
  if (!dns.bimiRecord) return notConfiguredLabel

  return `${dns.bimiRecord} (valid: ${String(dns.bimiValid)}, logo: ${dns.bimiLogoUrl ?? 'none'}, certificate: ${dns.bimiCertificateUrl ?? 'none'})`
}
