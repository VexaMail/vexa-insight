import type {
  DiagnosticStats,
  DiagnosticsAdminGuide,
} from '@/types/diagnostics'

export function createSpfPermerrorGuide(
  stats: DiagnosticStats,
): DiagnosticsAdminGuide {
  return {
    id: 'spf-permerror-traffic',
    severity: 'high',
    title: 'Historical data shows SPF PermError',
    summary: `${String(stats.spf_permerror)} SPF PermError events were observed across ${String(stats.failedEvents)} failed events.`,
    whyItMatters:
      'This indicates the issue is not only theoretical in DNS: real mail is already failing because of SPF syntax or excessive lookups.',
    howToFix:
      'Fix the published SPF record before tightening DMARC. If you have several ESPs, inventory all senders and reduce chained dependencies.',
    verifySteps: [
      'Review the SPF record again after each change.',
      'Confirm in subsequent DMARC reports that PermError drops to zero.',
    ],
  }
}
