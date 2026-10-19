import { StatTile, StatusPill } from '@/components/ui'
import type { IpRateTileProps } from '@/types/ips'
import { formatMessageCount } from '@/utils/ips'

/** A rate KPI with its own verdict pill and denominator. */
export function IpRateTile({ check, total }: Readonly<IpRateTileProps>) {
  return (
    <StatTile
      label={check.label}
      tone={check.verdict.tone}
      value={
        <span className="flex flex-wrap items-center gap-2">
          {check.rate.toFixed(1)}%
          <StatusPill tone={check.verdict.tone} className="font-sans">
            {check.verdict.label}
          </StatusPill>
        </span>
      }
      hint={`${check.count.toLocaleString()} of ${formatMessageCount(total)}`}
    />
  )
}
