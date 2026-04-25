import type { DiagnosticStats } from '@/types/diagnostics'
import type { DiagnosticsStatsSummary } from '../contracts/DiagnosticsStatsSummary'

/** Transforms raw DiagnosticStats into a normalized AI-ready shape. */
export function buildDiagnosticsStatsSummary(
  stats: DiagnosticStats,
): DiagnosticsStatsSummary {
  const passRate =
    stats.totalEvents > 0
      ? Math.round(
          ((stats.totalEvents - stats.failedEvents) / stats.totalEvents) * 100,
        )
      : 0

  return {
    totalMessages: stats.totalEvents,
    failedMessages: stats.failedEvents,
    passRate,
    spfAuthFailCount: stats.spf_auth_fail,
    spfPermerrorCount: stats.spf_permerror,
    spfTemperrorCount: stats.spf_temperror,
    spfSoftfailCount: stats.spf_softfail,
    spfPassUnalignedCount: stats.spf_pass_unaligned,
    dkimAllFailCount: stats.dkim_all_fail,
    dkimPassUnalignedCount: stats.dkim_pass_unaligned,
    dmarcOverrideForwarded: stats.dmarc_override_forwarded,
    dmarcOverrideLocalPolicy: stats.dmarc_override_local_policy,
  }
}
