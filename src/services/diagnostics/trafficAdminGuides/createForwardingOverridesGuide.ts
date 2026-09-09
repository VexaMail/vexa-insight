import type {
  DiagnosticStats,
  DiagnosticsAdminGuide,
} from '@/types/diagnostics'

export function createForwardingOverridesGuide(
  stats: DiagnosticStats,
): DiagnosticsAdminGuide {
  return {
    id: 'forwarding-overrides',
    severity: 'medium',
    title: 'There is a meaningful volume of forwarded mail',
    summary: `Forwarding overrides account for ${String(stats.dmarc_override_forwarded)} of ${String(stats.failedEvents)} failed events.`,
    whyItMatters:
      'Forwarding often breaks SPF and sometimes DKIM when the message is modified. If you do not understand this pattern, it is easy to misread it as a configuration failure.',
    howToFix:
      'Separate legitimate forwarding from spoofing. If you control the forwarding hops, consider ARC. If not, prioritize strong DKIM on senders so signatures survive forwarding.',
    verifySteps: [
      'Locate which routes or aliases cause forwarding.',
      'Check whether DKIM still passes when SPF fails in those cases.',
    ],
  }
}
