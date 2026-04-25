import { formatRelativeDate } from '@/utils/format'
import { getAuthHealthStatus } from '@/utils/ips'
import AuthHealthBadge from './AuthHealthBadge'
import type { IpDetailSummaryProps } from './IpDetailSummaryProps'
import { IpDisplay } from './IpDisplay'

export default function IpDetailSummary({
  data,
}: Readonly<IpDetailSummaryProps>) {
  const status = getAuthHealthStatus(data.fullyAlignedRate)
  const firstSeen = data.firstSeen ? formatRelativeDate(data.firstSeen) : null
  const lastSeen = data.lastSeen ? formatRelativeDate(data.lastSeen) : null

  return (
    <div className="glass-card space-y-6 p-6">
      <div className="flex items-center gap-4">
        <IpDisplay
          ip={data.ip}
          countryCode={data.countryCode}
          hostname={data.hostname}
          layout="stacked"
          ipAsLink={false}
          className="flex-1 [&_span.font-mono]:text-xl [&_span.font-mono]:font-bold"
        />
        <AuthHealthBadge status={status} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <div>
          <p className="text-muted-foreground text-xs font-medium">
            Total Messages
          </p>
          <p className="text-lg font-bold tabular-nums">
            {data.totalMessages.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs font-medium">
            Fully Aligned
          </p>
          <p className="text-lg font-bold tabular-nums">
            {data.fullyAlignedRate.toFixed(1)}%
          </p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs font-medium">SPF Pass</p>
          <p className="text-lg font-bold tabular-nums">
            {data.spfPassRate.toFixed(1)}%
          </p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs font-medium">DKIM Pass</p>
          <p className="text-lg font-bold tabular-nums">
            {data.dkimPassRate.toFixed(1)}%
          </p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs font-medium">
            First Seen
          </p>
          <p className="text-sm font-medium" title={firstSeen?.absolute}>
            {firstSeen?.relative ?? 'Unknown'}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs font-medium">Last Seen</p>
          <p className="text-sm font-medium" title={lastSeen?.absolute}>
            {lastSeen?.relative ?? 'Unknown'}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs font-medium">
            Disposition: None
          </p>
          <p className="text-sm font-medium tabular-nums">
            {data.dispositionNone.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs font-medium">
            Quarantine / Reject
          </p>
          <p className="text-sm font-medium tabular-nums">
            {(
              data.dispositionQuarantine + data.dispositionReject
            ).toLocaleString()}
          </p>
        </div>
      </div>

      <p className="text-muted-foreground/60 text-xs italic">
        Detailed event timeline is planned for a future release.
      </p>
    </div>
  )
}
