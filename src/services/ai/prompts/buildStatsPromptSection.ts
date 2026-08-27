import type { DiagnosticsStatsSummary } from '../contracts/DiagnosticsStatsSummary'

/** Builds the authentication statistics section for the diagnostics prompt. */
export function buildStatsPromptSection(
  stats: DiagnosticsStatsSummary,
): string {
  return `AUTHENTICATION STATISTICS (period aggregate):
- Total messages: ${stats.totalMessages}
- Failed messages: ${stats.failedMessages}
- Pass rate: ${stats.passRate}%
- SPF auth failures: ${stats.spfAuthFailCount}
- SPF permerror: ${stats.spfPermerrorCount}
- SPF temperror: ${stats.spfTemperrorCount}
- SPF softfail: ${stats.spfSoftfailCount}
- SPF pass but unaligned: ${stats.spfPassUnalignedCount}
- DKIM total failures: ${stats.dkimAllFailCount}
- DKIM pass but unaligned: ${stats.dkimPassUnalignedCount}
- DMARC overrides (forwarded): ${stats.dmarcOverrideForwarded}
- DMARC overrides (local policy): ${stats.dmarcOverrideLocalPolicy}`
}
