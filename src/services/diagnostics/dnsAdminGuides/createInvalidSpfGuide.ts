import type { DiagnosticsAdminGuide, DnsDiagnostics } from '@/types/diagnostics'

export function createInvalidSpfGuide(
  dns: DnsDiagnostics,
): DiagnosticsAdminGuide {
  return {
    id: 'invalid-spf',
    severity: 'high',
    title: 'SPF needs correction',
    summary:
      dns.spfWarning ??
      'The current SPF record is invalid or structurally incorrect.',
    whyItMatters:
      'An SPF record with syntax errors, multiple records, or too many lookups can trigger `PermError` and turn legitimate mail into authentication failures.',
    howToFix:
      'Reduce unnecessary `include` mechanisms, avoid multiple SPF records, and simplify the dependency tree. If you rely on several providers, consolidate their authorized ranges and IPs into a single `v=spf1` record.',
    verifySteps: [
      `dig TXT ${dns.domain} +short`,
      'Make sure there is only one SPF record.',
      'Review the number of `include`, `a`, `mx`, `exists`, and redirect mechanisms so you stay under 10 DNS lookups.',
    ],
  }
}
