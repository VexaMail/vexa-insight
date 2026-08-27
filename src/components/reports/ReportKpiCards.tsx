import { METRIC_STATUS_STYLES, METRIC_VALUE_STYLES } from '@/constants/metrics'
import { deriveComplianceStatus } from './deriveComplianceStatus'
import { deriveSourcesReviewStatus } from './deriveSourcesReviewStatus'
import type { ReportKpiCardsProps } from './ReportKpiCardsProps'

export function ReportKpiCards({ stats }: Readonly<ReportKpiCardsProps>) {
  const noData = stats.totalMessages === 0

  const complianceStatus = deriveComplianceStatus(stats.complianceRate)
  const spfStatus = deriveComplianceStatus(stats.spfAlignedRate)
  const dkimStatus = deriveComplianceStatus(stats.dkimAlignedRate)
  const reviewStatus = deriveSourcesReviewStatus(
    stats.sourcesRequiringReviewCount,
  )

  const cards = [
    {
      label: 'Compliance Rate',
      value: noData ? 'No data' : `${String(stats.complianceRate)}%`,
      status: complianceStatus,
    },
    {
      label: 'SPF Aligned',
      value: noData ? 'No data' : `${String(stats.spfAlignedRate)}%`,
      status: spfStatus,
    },
    {
      label: 'DKIM Aligned',
      value: noData ? 'No data' : `${String(stats.dkimAlignedRate)}%`,
      status: dkimStatus,
    },
    {
      label: 'Sources Requiring Review',
      value: noData ? 'No data' : String(stats.sourcesRequiringReviewCount),
      status: reviewStatus,
    },
    {
      label: 'Total Messages',
      value: noData ? 'No data' : stats.totalMessages.toLocaleString(),
      status: 'healthy' as const,
    },
  ] as const

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-lg border p-4 ${METRIC_STATUS_STYLES[card.status]}`}
        >
          <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            {card.label}
          </p>
          <p
            className={`mt-1 text-lg font-bold ${METRIC_VALUE_STYLES[card.status]}`}
          >
            {card.value}
          </p>
        </div>
      ))}
    </div>
  )
}
