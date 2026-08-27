import { METRIC_STATUS_STYLES, METRIC_VALUE_STYLES } from '@/constants/metrics'
import { cn } from '@/lib/utils'
import type { KpiCardProps } from './KpiCardProps'

export function KpiCard({
  label,
  value,
  status,
  icon,
  className,
}: Readonly<KpiCardProps>) {
  const containerClass = cn(
    'rounded-lg border p-4',
    status ? METRIC_STATUS_STYLES[status] : 'border-border bg-card',
    className,
  )

  const valueClass = cn(
    'mt-1 text-lg font-bold tabular-nums',
    status ? METRIC_VALUE_STYLES[status] : 'text-foreground',
  )

  if (icon) {
    return (
      <div className={cn('flex items-center gap-3', containerClass)}>
        <div className="shrink-0">{icon}</div>
        <div className="min-w-0">
          <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            {label}
          </p>
          <p className={valueClass}>{value}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={containerClass}>
      <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
        {label}
      </p>
      <p className={valueClass}>{value}</p>
    </div>
  )
}
