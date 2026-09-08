import type { DiagnosticsAdminGuide, DnsDiagnostics } from '@/types/diagnostics'

export function createMissingDmarcGuide(
  dns: DnsDiagnostics,
): DiagnosticsAdminGuide {
  return {
    id: 'missing-dmarc',
    severity: 'high',
    title: 'DMARC is not published',
    summary:
      'There is no DMARC record for the domain, so there is no declared policy for mail that fails alignment.',
    whyItMatters:
      'Without DMARC there is no unified monitoring or enforcement policy, and recipients do not get clear instructions on visible-domain spoofing.',
    howToFix: `Publish a TXT record at _dmarc.${dns.domain}, starting with monitoring mode. A safe starting point is \`v=DMARC1; p=none; rua=mailto:dmarc@${dns.domain}\`. Once legitimate traffic is covered, move to \`quarantine\` or \`reject\`.`,
    verifySteps: [
      `dig TXT _dmarc.${dns.domain} +short`,
      'Confirm the record starts with `v=DMARC1`.',
      'Check that the `rua` mailbox exists and can receive reports.',
    ],
  }
}
