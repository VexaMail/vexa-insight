import type { DiagnosticsAdminGuide, DnsDiagnostics } from '@/types/diagnostics'

export function createMtaStsPolicyUnreachableGuide(
  dns: DnsDiagnostics,
): DiagnosticsAdminGuide {
  return {
    id: 'mtasts-policy-unreachable',
    severity: 'high',
    title: 'The MTA-STS policy file is not reachable',
    summary:
      'The MTA-STS TXT record exists, but the `/.well-known/mta-sts.txt` file does not respond correctly over HTTPS.',
    whyItMatters:
      'The TXT record alone does not enable protection. If the file cannot be read, other MTAs cannot apply the policy.',
    howToFix:
      'Serve the policy file from `mta-sts.<domain>` with a valid TLS certificate, HTTP 200 status, and content that matches your real MX hosts.',
    verifySteps: [
      `curl -i https://mta-sts.${dns.domain}/.well-known/mta-sts.txt`,
      'Validate the TLS certificate for the `mta-sts` host.',
      'Confirm that the content includes `version`, `mode`, `mx`, and `max_age`.',
    ],
  }
}
