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
}: Readonly<IpRateTileProps>) {
  return (
    <StatTile
      variant="feature"
      label={label ?? check.label}
      tone={check.verdict.tone}
      icon={icon}
      trend={trend}
      trendKind="bars"
      value={`${check.rate.toFixed(1)}%`}
      hint={
        <span className="flex flex-wrap items-center gap-2">
          <IpVerdictPill verdict={check.verdict} />
          {`${check.count.toLocaleString()} of ${formatMessageCount(total)}`}
        </span>
      }
    />
  )
}
