import type { ExecutiveMetricCardProps } from './ExecutiveMetricCardProps'
import { METRIC_STATUS_STYLES } from './metricStatusStyles'
import { METRIC_VALUE_STYLES } from './metricValueStyles'

export function ExecutiveMetricCard({
  label,
  value,
  status,
}: Readonly<ExecutiveMetricCardProps>) {
  return (
    <div className={`rounded-lg border p-4 ${METRIC_STATUS_STYLES[status]}`}>
      <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
        {label}
      </p>
      <p className={`mt-1 text-lg font-bold ${METRIC_VALUE_STYLES[status]}`}>
        {value}
      </p>
    </div>
  )
}
