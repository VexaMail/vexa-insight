import type { DiagnosticsReportAggregate } from '../contracts/DiagnosticsReportAggregate'

/** Builds the report aggregate section for the diagnostics prompt. */
export function buildReportAggregatePromptSection(
  ra: DiagnosticsReportAggregate,
): string {
  const spfRate =
    ra.totalMessages > 0
      ? Math.round((ra.spfPassCount / ra.totalMessages) * 100)
      : 0
  const dkimRate =
    ra.totalMessages > 0
      ? Math.round((ra.dkimPassCount / ra.totalMessages) * 100)
      : 0
  const spfAlignRate =
    ra.totalMessages > 0
      ? Math.round((ra.spfAlignedCount / ra.totalMessages) * 100)
      : 0
  const dkimAlignRate =
    ra.totalMessages > 0
      ? Math.round((ra.dkimAlignedCount / ra.totalMessages) * 100)
      : 0

  const dispositionStr = Object.entries(ra.dispositionBreakdown)
    .map(([d, c]) => `${d}: ${c}`)
    .join(', ')

  const orgsStr = ra.topOrgs
    .map((o) => `${o.orgName} (${o.messageCount} msgs)`)
    .join(', ')

  return `AGGREGATED REPORT DATA (${ra.reportCount} reports, ${ra.orgCount} orgs, period: ${ra.dateRange.start ?? '?'} – ${ra.dateRange.end ?? '?'}):
- Total messages: ${ra.totalMessages}
- SPF pass: ${ra.spfPassCount} (${spfRate}%)
- DKIM pass: ${ra.dkimPassCount} (${dkimRate}%)
- SPF aligned: ${ra.spfAlignedCount} (${spfAlignRate}%)
- DKIM aligned: ${ra.dkimAlignedCount} (${dkimAlignRate}%)
- Dispositions: ${dispositionStr || 'none'}
- Forwarded overrides: ${ra.forwardedOverrideCount}
- Top reporting orgs: ${orgsStr || 'none'}`
}
