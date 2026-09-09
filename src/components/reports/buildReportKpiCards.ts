import type { ReportStats } from '@/types/reports'
import { deriveComplianceStatus } from './deriveComplianceStatus'
import { deriveSourcesReviewStatus } from './deriveSourcesReviewStatus'
import type { ReportKpiCardDefinition } from './ReportKpiCardDefinition'

/** The five report figures; every value reads "No data" on an empty report. */
export function buildReportKpiCards(
  stats: ReportStats,
): ReportKpiCardDefinition[] {
  const noData = stats.totalMessages === 0

  return [
    {
      label: 'Compliance Rate',
      value: noData ? 'No data' : `${String(stats.complianceRate)}%`,
      status: deriveComplianceStatus(stats.complianceRate),
    },
    {
      label: 'SPF Aligned',
      value: noData ? 'No data' : `${String(stats.spfAlignedRate)}%`,
      status: deriveComplianceStatus(stats.spfAlignedRate),
    },
    {
      label: 'DKIM Aligned',
      value: noData ? 'No data' : `${String(stats.dkimAlignedRate)}%`,
      status: deriveComplianceStatus(stats.dkimAlignedRate),
    },
    {
      label: 'Sources Requiring Review',
      value: noData ? 'No data' : String(stats.sourcesRequiringReviewCount),
      status: deriveSourcesReviewStatus(stats.sourcesRequiringReviewCount),
    },
    {
      label: 'Total Messages',
      value: noData ? 'No data' : stats.totalMessages.toLocaleString(),
      status: 'healthy',
    },
  ]
}
