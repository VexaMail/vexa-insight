import { StatTile } from '@/components/ui'
import type { IpRateTileProps } from '@/types/ips'
import { formatMessageCount } from '@/utils/ips'
import { IpVerdictPill } from './IpVerdictPill'

/** A rate KPI with its verdict pill, denominator and daily trend. */
export function IpRateTile({
  check,
  total,
  trend,
  icon,
  label,
  variant,
}: Readonly<IpRateTileProps>) {
  return (
    <StatTile
      variant={variant}
      label={label ?? check.label}
      tone={check.verdict.tone}
      icon={variant === 'feature' ? icon : null}
      trend={trend}
      trendKind="bars"
      value={`${check.rate.toFixed(1)}%`}
      hint={
        <span className="flex flex-wrap items-center gap-2">
          <IpVerdictPill verdict={check.verdict} />
          {`${check.count.toLocaleString('en-US')} of ${formatMessageCount(total)}`}
        </span>
      }
    />
  )
}
