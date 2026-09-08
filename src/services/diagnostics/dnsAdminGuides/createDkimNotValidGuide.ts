import type { DiagnosticsAdminGuide, DnsDiagnostics } from '@/types/diagnostics'

export function createDkimNotValidGuide(
  dns: DnsDiagnostics,
): DiagnosticsAdminGuide {
  return {
    id: 'dkim-not-valid',
    severity: 'high',
    title: 'No valid DKIM selectors were detected',
    summary:
      'The DKIM probes did not detect any valid selector among the known selectors being checked.',
    whyItMatters:
      'If legitimate traffic depends on DKIM and the public keys are inaccessible or invalid, DMARC alignment can break even when SPF only partially succeeds.',
    howToFix:
      'Confirm which selectors each ESP really uses, publish their public keys at `<selector>._domainkey`, and review recent rotations. If a selector was revoked, make sure the sender no longer signs with it.',
    verifySteps: [
      `dig TXT selector1._domainkey.${dns.domain} +short`,
      'Validate the real selector in your ESP or outbound MTA.',
      'Confirm that the record includes `v=DKIM1` and a non-empty `p=` value.',
    ],
  }
}
