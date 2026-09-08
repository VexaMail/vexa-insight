import type { DiagnosticsAdminGuide, DnsDiagnostics } from '@/types/diagnostics'

export function createInvalidDmarcGuide(
  dns: DnsDiagnostics,
): DiagnosticsAdminGuide {
  return {
    id: 'invalid-dmarc',
    severity: 'high',
    title: 'DMARC has validation errors',
    summary: dns.dmarcWarnings.join(' ') || 'The DMARC record is invalid.',
    whyItMatters:
      'An invalid DMARC record can be ignored by receivers or interpreted inconsistently, leaving the domain without effective protection.',
    howToFix:
      'Fix the TXT syntax at `_dmarc` and keep only valid tags. Prioritize `v`, `p`, and `rua`, then review optional tags such as `pct`, `adkim`, `aspf`, or `fo`.',
    verifySteps: [
      `dig TXT _dmarc.${dns.domain} +short`,
      'Verify tag order and syntax.',
      'Confirm that `p=` has an allowed value: `none`, `quarantine`, or `reject`.',
    ],
  }
}
