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
    .map(([d, c]) => `${d}: ${String(c)}`)
    .join(', ')

  const orgsStr = ra.topOrgs
    .map((o) => `${o.orgName} (${String(o.messageCount)} msgs)`)
    .join(', ')

  return `AGGREGATED REPORT DATA (${String(ra.reportCount)} reports, ${String(ra.orgCount)} orgs, period: ${ra.dateRange.start ?? '?'} – ${ra.dateRange.end ?? '?'}):
- Total messages: ${String(ra.totalMessages)}
- SPF pass: ${String(ra.spfPassCount)} (${String(spfRate)}%)
- DKIM pass: ${String(ra.dkimPassCount)} (${String(dkimRate)}%)
- SPF aligned: ${String(ra.spfAlignedCount)} (${String(spfAlignRate)}%)
- DKIM aligned: ${String(ra.dkimAlignedCount)} (${String(dkimAlignRate)}%)
- Dispositions: ${dispositionStr || 'none'}
- Forwarded overrides: ${String(ra.forwardedOverrideCount)}
- Top reporting orgs: ${orgsStr || 'none'}`
}
