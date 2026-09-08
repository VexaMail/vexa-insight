import type { DiagnosticsAdminGuide, DnsDiagnostics } from '@/types/diagnostics'

export function createMissingSpfGuide(
  dns: DnsDiagnostics,
): DiagnosticsAdminGuide {
  return {
    id: 'missing-spf',
    severity: 'high',
    title: 'SPF is not published',
    summary:
      'The domain does not publish an SPF record and cannot declare which servers are authorized to send mail.',
    whyItMatters:
      'Without SPF, receivers cannot validate the Return-Path against an explicit allowlist of sending sources, which weakens DMARC and makes spoofing easier.',
    howToFix: `Publish a TXT record at ${dns.domain} that includes every legitimate sender. Start conservatively, for example \`v=spf1 include:your-esp.example ~all\`, and add each real provider before tightening to \`-all\`.`,
    verifySteps: [
      `dig TXT ${dns.domain} +short`,
      'Confirm there is only one SPF record starting with `v=spf1`.',
      'Verify that all legitimate ESPs and relays are covered.',
    ],
  }
}
