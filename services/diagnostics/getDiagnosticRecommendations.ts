import type {
  DiagnosticRecommendation,
  DiagnosticStats,
} from '@/types/diagnostics'

export function getDiagnosticRecommendations(
  stats: DiagnosticStats,
): DiagnosticRecommendation[] {
  const recommendations: DiagnosticRecommendation[] = []

  // Ratios
  const spfPermerrorRatio =
    stats.failedEvents > 0 ? stats.spf_permerror / stats.failedEvents : 0
  const spfUnalignedRatio =
    stats.totalEvents > 0 ? stats.spf_pass_unaligned / stats.totalEvents : 0
  const forwardedRatio =
    stats.failedEvents > 0
      ? stats.dmarc_override_forwarded / stats.failedEvents
      : 0

  if (spfPermerrorRatio >= 0.1) {
    recommendations.push({
      type: 'spf_permerror',
      title: 'High SPF PermError Rate',
      recommendation:
        'A large volume of emails failed SPF due to a PermError. This usually means your SPF record has syntax errors or exceeds the 10 DNS lookup limit. Consider flattening your SPF record or removing unneeded `include` statements.',
    })
  } else if (stats.spf_permerror > 0) {
    recommendations.push({
      type: 'spf_permerror',
      title: 'SPF PermError Detected',
      recommendation:
        'Some emails failed SPF due to a PermError. Verify your SPF syntax in your DNS registrar.',
    })
  }

  if (spfUnalignedRatio >= 0.1) {
    recommendations.push({
      type: 'spf_unaligned',
      title: 'High SPF Alignment Failures',
      recommendation:
        "Many emails passed SPF but failed DMARC alignment. This happens when the Return-Path domain doesn't match the Header From domain. Ensure your third-party senders support custom Return-Paths.",
    })
  }

  if (forwardedRatio >= 0.15) {
    recommendations.push({
      type: 'dmarc_forwarded',
      title: 'Significant Forwarding Traffic',
      recommendation:
        'A large portion of your overrides are due to forwarded emails. Forwarding breaks SPF alignment and often breaks DKIM if the message is modified. Consider implementing ARC (Authenticated Received Chain) if you control the forwarding servers, or ensure strict DKIM signing.',
    })
  }

  if (
    stats.dkim_all_fail > 0 &&
    stats.dkim_all_fail / stats.totalEvents > 0.1
  ) {
    recommendations.push({
      type: 'dkim_failure',
      title: 'Frequent DKIM Failures',
      recommendation:
        'A noticeable amount of DKIM signatures are failing validation. Check if your ESP is modifying the email body or headers in transit, or if your public DKIM keys have been rotated incorrectly.',
    })
  }

  // Fallback if no specific issues are flagged but there are failures
  if (recommendations.length === 0 && stats.failedEvents > 0) {
    recommendations.push({
      type: 'general',
      title: 'General Authentication Failures',
      recommendation:
        'Review the charts below. If failures are concentrated on specific IPs, check your infrastructure configuration. Otherwise, this might be spoofing traffic.',
    })
  }

  return recommendations
}
