import type { DiagnosticsAdminGuide, DnsDiagnostics } from '@/types/diagnostics'

export function createMonitoringOnlyDmarcGuide(
  dns: DnsDiagnostics,
): DiagnosticsAdminGuide {
  return {
    id: 'monitoring-only-dmarc',
    severity: 'medium',
    title: 'DMARC is monitoring only',
    summary:
      'The domain publishes DMARC, but the `p=none` policy does not block or quarantine mail that fails authentication.',
    whyItMatters:
      'Monitoring helps you observe coverage, but it does not prevent spoofed mail from being delivered when authentication fails.',
    howToFix:
      'Once SPF and DKIM cover legitimate traffic, gradually raise the policy to `quarantine` and then to `reject`. Do this only after authorized senders are inventoried.',
    verifySteps: [
      `dig TXT _dmarc.${dns.domain} +short`,
      'Check that SPF and DKIM alignment remain stable before tightening the policy.',
      'Monitor aggregate reports after the change to catch false positives.',
    ],
  }
}
