import type { DiagnosticsStatsSummary } from '../contracts/DiagnosticsStatsSummary'

/** Builds the authentication statistics section for the diagnostics prompt. */
export function buildStatsPromptSection(
  stats: DiagnosticsStatsSummary,
): string {
  return `AUTHENTICATION STATISTICS (period aggregate):
- Total messages: ${String(stats.totalMessages)}
- Failed messages: ${String(stats.failedMessages)}
- Pass rate: ${String(stats.passRate)}%
- SPF auth failures: ${String(stats.spfAuthFailCount)}
- SPF permerror: ${String(stats.spfPermerrorCount)}
- SPF temperror: ${String(stats.spfTemperrorCount)}
- SPF softfail: ${String(stats.spfSoftfailCount)}
- SPF pass but unaligned: ${String(stats.spfPassUnalignedCount)}
- DKIM total failures: ${String(stats.dkimAllFailCount)}
- DKIM pass but unaligned: ${String(stats.dkimPassUnalignedCount)}
- DMARC overrides (forwarded): ${String(stats.dmarcOverrideForwarded)}
- DMARC overrides (local policy): ${String(stats.dmarcOverrideLocalPolicy)}`
}
