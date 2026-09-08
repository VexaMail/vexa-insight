import type { DiagnosticsAdminGuide, DnsDiagnostics } from '@/types/diagnostics'

export function createSpfHardeningGuide(
  dns: DnsDiagnostics,
): DiagnosticsAdminGuide {
  return {
    id: 'spf-hardening',
    severity: 'low',
    title: 'SPF can be hardened',
    summary: dns.spfWarning ?? '',
    whyItMatters:
      'This is not an active authentication failure. It is a posture improvement that reduces ambiguity for unauthorized senders.',
    howToFix:
      'If you have already inventoried all legitimate senders and do not expect any new sending platforms, you can move from `~all` to `-all`. If you are still validating coverage, keeping `~all` is reasonable.',
    verifySteps: [
      `dig TXT ${dns.domain} +short`,
      'Confirm that all legitimate senders are included before switching to `-all`.',
      'Monitor DMARC reports after the change to catch false positives.',
    ],
  }
}
