import { StatTile } from '@/components/ui'
import type { IpDetailContextProps } from '@/types/ips'
import { IpRateTile } from './IpRateTile'

/** Messages, SPF authentication, DKIM authentication and the DMARC result. */
export function IpDetailKpis({ ctx }: Readonly<IpDetailContextProps>) {
  const total = ctx.data.totalMessages
  const shown = ctx.checks.filter((check) =>
    ['spf-auth', 'dkim-auth', 'dmarc'].includes(check.key),
  )
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatTile
        label="Total messages"
        value={total.toLocaleString()}
        hint="Reported in the window"
      />
      {shown.map((check) => (
        <IpRateTile key={check.key} check={check} total={total} />
      ))}
    </div>
  )
}
