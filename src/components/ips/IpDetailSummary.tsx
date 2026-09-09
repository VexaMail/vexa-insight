import { getAuthHealthStatus } from '@/utils/ips'
import AuthHealthBadge from './AuthHealthBadge'
import { buildIpDetailStats } from './buildIpDetailStats'
import { IpDetailStat } from './IpDetailStat'
import type { IpDetailSummaryProps } from './IpDetailSummaryProps'
import { IpDisplay } from './IpDisplay'

export default function IpDetailSummary({
  data,
}: Readonly<IpDetailSummaryProps>) {
  const status = getAuthHealthStatus(data.fullyAlignedRate)

  return (
    <div className="glass-card space-y-6 p-6">
      <div className="flex items-center gap-4">
        <IpDisplay
          ip={data.ip}
          countryCode={data.countryCode}
          hostname={data.hostname}
          hostnameLastLookupAt={data.hostnameLastLookupAt}
          layout="stacked"
          ipAsLink={false}
          className="flex-1 [&_span.font-mono]:text-xl [&_span.font-mono]:font-bold"
        />
        <AuthHealthBadge status={status} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {buildIpDetailStats(data).map((stat) => (
          <IpDetailStat key={stat.label} {...stat} />
        ))}
      </div>

      <p className="text-muted-foreground/60 text-xs italic">
        Detailed event timeline is planned for a future release.
      </p>
    </div>
  )
}
