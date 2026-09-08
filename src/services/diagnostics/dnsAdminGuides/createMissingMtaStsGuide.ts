import type { DiagnosticsAdminGuide, DnsDiagnostics } from '@/types/diagnostics'

export function createMissingMtaStsGuide(
  dns: DnsDiagnostics,
): DiagnosticsAdminGuide {
  return {
    id: 'missing-mta-sts',
    severity: 'medium',
    title: 'MTA-STS is not published',
    summary:
      'The domain does not publish an MTA-STS policy to protect inbound SMTP delivery with validated TLS.',
    whyItMatters:
      'Without MTA-STS, a man-in-the-middle attacker can force downgrades or exploit insecure MX handling when other MTAs negotiate delivery to your domain.',
    howToFix:
      `Publish \`v=STSv1; id=<version>\` at _mta-sts.${dns.domain} and serve \`https://mta-sts.${dns.domain}/.well-known/mta-sts.txt\` with ` +
      'the entries `version: STSv1`, `mode: enforce|testing`, `mx:`, and `max_age:`.',
    verifySteps: [
      `dig TXT _mta-sts.${dns.domain} +short`,
      `curl -i https://mta-sts.${dns.domain}/.well-known/mta-sts.txt`,
      'Check that the `mx:` entries in the file match your real MX hosts.',
    ],
  }
}
