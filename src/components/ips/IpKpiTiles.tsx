import { StatTile } from '@/components/ui'
import type { IpKpiTilesProps } from '@/types/ips'
import { Mail } from 'lucide-react'
import { IpRateTile } from './IpRateTile'
import { IpShieldIcon } from './IpShieldIcon'

/** Messages, SPF authentication, DKIM authentication and the DMARC result. */
export function IpKpiTiles({ ctx, variant }: Readonly<IpKpiTilesProps>) {
  const total = ctx.data.totalMessages
  const { trend } = ctx
  // Fixed order: SPF auth, DKIM auth, SPF alignment, DKIM alignment, DMARC.
  const [spf, dkim, , , dmarc] = ctx.checks
  return (
    <>
      <StatTile
        variant={variant}
        label="Total messages"
        value={total.toLocaleString('en-US')}
        hint="Reported in the window"
        icon={variant === 'feature' ? <Mail /> : null}
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
          variant={variant}
        />
      ) : null}
      {dkim ? (
        <IpRateTile
          check={dkim}
          total={total}
          trend={trend.dkimAuth}
          icon={<IpShieldIcon tone={dkim.verdict.tone} />}
          variant={variant}
        />
      ) : null}
      {dmarc ? (
        <IpRateTile
          check={dmarc}
          label="DMARC result"
          total={total}
          trend={trend.dmarc}
          icon={<IpShieldIcon tone={dmarc.verdict.tone} />}
          variant={variant}
        />
      ) : null}
    </>
  )
}
