import type {
  DiagnosticStats,
  DiagnosticsAdminGuide,
} from '@/types/diagnostics'

export function createTrafficAdminGuides(
  stats: DiagnosticStats,
): DiagnosticsAdminGuide[] {
  const guides: DiagnosticsAdminGuide[] = []
  const spfPermerrorRatio =
    stats.failedEvents > 0 ? stats.spf_permerror / stats.failedEvents : 0
  const spfUnalignedRatio =
    stats.totalEvents > 0 ? stats.spf_pass_unaligned / stats.totalEvents : 0
  const dkimFailureRatio =
    stats.totalEvents > 0 ? stats.dkim_all_fail / stats.totalEvents : 0
  const forwardedRatio =
    stats.failedEvents > 0
      ? stats.dmarc_override_forwarded / stats.failedEvents
      : 0

  if (spfPermerrorRatio >= 0.05) {
    guides.push({
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
    })
  }

  if (spfUnalignedRatio >= 0.05) {
    guides.push({
      id: 'spf-unaligned',
      severity: 'medium',
      title: 'Some traffic passes SPF but is not DMARC-aligned',
      summary: `SPF passes without alignment in ${String(stats.spf_pass_unaligned)} of ${String(stats.totalEvents)} observed events.`,
      whyItMatters:
        'This usually indicates delegated Return-Path usage, third-party bounce domains, or partial ESP configurations that pass SPF but do not satisfy DMARC.',
      howToFix:
        'Review each sending provider and configure a custom Return-Path or MAIL FROM under your domain so it aligns with the Header From.',
      verifySteps: [
        'Identify which platforms send with an external envelope sender.',
        'Confirm in later reports that the SPF unaligned rate goes down.',
      ],
    })
  }

  if (dkimFailureRatio >= 0.05) {
    guides.push({
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
    })
  }

  if (forwardedRatio >= 0.1) {
    guides.push({
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
    })
  }

  return guides
}
