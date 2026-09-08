import type { DiagnosticsDnsSummary } from '../../../contracts/DiagnosticsDnsSummary'

export function formatDmarcWarnings(dns: DiagnosticsDnsSummary): string {
  return dns.dmarcWarnings.length > 0
    ? `\n- DMARC validation errors: ${dns.dmarcWarnings.join('; ')}`
    : ''
}
