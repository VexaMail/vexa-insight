import type { DiagnosticsAdminGuide, DnsDiagnostics } from '@/types/diagnostics'

export function createMissingTlsRptGuide(
  dns: DnsDiagnostics,
): DiagnosticsAdminGuide {
  return {
    id: 'missing-tlsrpt',
    severity: 'low',
    title: 'TLS-RPT is not published',
    summary:
      'There is no TLS-RPT record, and no address is declared to receive inbound TLS failure reports.',
    whyItMatters:
      'TLS-RPT does not prevent failures by itself, but it provides operational visibility when there are TLS or MTA-STS policy problems.',
    howToFix: `Publish a TXT record at _smtp._tls.${dns.domain} with a value such as \`v=TLSRPTv1; rua=mailto:tlsrpt@${dns.domain}\` and enable delivery to that mailbox.`,
    verifySteps: [
      `dig TXT _smtp._tls.${dns.domain} +short`,
      'Check that the `rua` address exists and receives mail.',
    ],
  }
}
