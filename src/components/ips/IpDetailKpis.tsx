import { StatTile } from '@/components/ui'
import type { IpDetailContextProps } from '@/types/ips'
import { KeyRound, Mail, ShieldCheck } from 'lucide-react'
import { IpRateTile } from './IpRateTile'

/** Messages, SPF authentication, DKIM authentication and the DMARC result. */
export function IpDetailKpis({ ctx }: Readonly<IpDetailContextProps>) {
  const total = ctx.data.totalMessages
  const { trend } = ctx
  // Fixed order: SPF auth, SPF aligned, DKIM auth, DKIM aligned, DMARC.
  const [spf, , dkim, , dmarc] = ctx.checks
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
          icon={<ShieldCheck />}
        />
      ) : null}
      {dkim ? (
        <IpRateTile
          check={dkim}
          total={total}
          trend={trend.dkimAuth}
          icon={<KeyRound />}
        />
      ) : null}
      {dmarc ? (
        <IpRateTile
          check={dmarc}
          total={total}
          trend={trend.dmarc}
          icon={<ShieldCheck />}
        />
      ) : null}
    </div>
  )
}
