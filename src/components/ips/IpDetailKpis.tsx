import { StatTile } from '@/components/ui'
import type { IpDetailContextProps } from '@/types/ips'
import { Mail } from 'lucide-react'
import { IpRateTile } from './IpRateTile'
import { IpShieldIcon } from './IpShieldIcon'

/** Messages, SPF authentication, DKIM authentication and the DMARC result. */
export function IpDetailKpis({ ctx }: Readonly<IpDetailContextProps>) {
  const total = ctx.data.totalMessages
  const { trend } = ctx
  // Fixed order: SPF auth, DKIM auth, SPF alignment, DKIM alignment, DMARC.
  const [spf, dkim, , , dmarc] = ctx.checks
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatTile
        variant="feature"
        label="Total messages"
        value={total.toLocaleString()}
        hint="Reported in the window"
        icon={<Mail />}
        accent="info"
        trend={trend.volume}
        trendKind="bars"
      />
      {spf ? (
        <IpRateTile
          check={spf}
          total={total}
          trend={trend.spfAuth}
          icon={<IpShieldIcon tone={spf.verdict.tone} />}
        />
      ) : null}
      {dkim ? (
        <IpRateTile
          check={dkim}
          total={total}
          trend={trend.dkimAuth}
          icon={<IpShieldIcon tone={dkim.verdict.tone} />}
        />
      ) : null}
      {dmarc ? (
        <IpRateTile
          check={dmarc}
          label="DMARC result"
          total={total}
          trend={trend.dmarc}
          icon={<IpShieldIcon tone={dmarc.verdict.tone} />}
        />
      ) : null}
    </div>
  )
}
