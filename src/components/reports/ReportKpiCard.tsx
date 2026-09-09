import { METRIC_STATUS_STYLES, METRIC_VALUE_STYLES } from '@/constants/metrics'
import type { ReportKpiCardProps } from './ReportKpiCardProps'

export function ReportKpiCard({ card }: Readonly<ReportKpiCardProps>) {
  return (
    <div
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
  )
}
