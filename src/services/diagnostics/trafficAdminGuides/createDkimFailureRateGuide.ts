import type {
  DiagnosticStats,
  DiagnosticsAdminGuide,
} from '@/types/diagnostics'

export function createDkimFailureRateGuide(
  stats: DiagnosticStats,
): DiagnosticsAdminGuide {
  return {
    id: 'dkim-failure-rate',
    severity: 'high',
    title: 'The DKIM failure rate needs investigation',
    summary: `DKIM fails in ${String(stats.dkim_all_fail)} of ${String(stats.totalEvents)} observed events.`,
    whyItMatters:
      'A sustained DKIM failure rate often breaks DMARC alignment for legitimate mail and can point to key rotation issues, stale signatures, or message modifications in transit.',
    howToFix:
      'Check active public keys, the selectors actually used by each ESP, and whether any relay or gateway changes the body or headers after signing.',
    verifySteps: [
      'Validate the selector used by each sending provider.',
      'Compare the DKIM fail trend before and after key or gateway changes.',
    ],
  }
}
