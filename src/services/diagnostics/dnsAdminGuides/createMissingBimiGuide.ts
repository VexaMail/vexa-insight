import type { DiagnosticsAdminGuide, DnsDiagnostics } from '@/types/diagnostics'

export function createMissingBimiGuide(
  dns: DnsDiagnostics,
): DiagnosticsAdminGuide {
  return {
    id: 'missing-bimi',
    severity: 'low',
    title: 'BIMI is not configured',
    summary:
      'There is no BIMI record, and the domain does not publish a verifiable brand logo.',
    whyItMatters:
      'This usually does not break delivery, but it reduces brand visibility and often indicates that the domain has not completed more advanced trust layers yet.',
    howToFix: `Publish a TXT record at default._bimi.${dns.domain} with \`v=BIMI1; l=https://.../logo.svg\` and add a VMC certificate if your provider supports it.`,
    verifySteps: [
      `dig TXT default._bimi.${dns.domain} +short`,
      'Verify that the logo URL is reachable over HTTPS.',
      'If you use VMC, confirm that the `a=` field points to the correct certificate.',
    ],
  }
}
