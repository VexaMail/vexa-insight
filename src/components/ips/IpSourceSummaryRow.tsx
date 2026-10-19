import type { IpSourceSummaryRowProps } from '@/types/ips'
import Link from 'next/link'
import { IpFlag } from './IpFlag'
import { IpLastSeen } from './IpLastSeen'
import { SourceCausePill } from './SourceCausePill'

/** A source as a compact two-line summary for phone widths. */
export function IpSourceSummaryRow({ row }: Readonly<IpSourceSummaryRowProps>) {
  const detail = [row.hostname ?? 'No reverse DNS', row.sender?.name]
    .filter(Boolean)
    .join(' · ')
  return (
    <div className="flex min-w-0 flex-col gap-1.5 py-0.5">
      <div className="flex min-w-0 items-center gap-2">
        <IpFlag countryCode={row.countryCode} />
        <Link
          href={`/ips/${encodeURIComponent(row.ip)}`}
          className="text-foreground min-w-0 flex-1 truncate font-mono text-[13px]"
        >
          {row.ip}
        </Link>
        <span className="text-foreground shrink-0 font-mono text-[13px] tabular-nums">
          {row.totalMessages.toLocaleString('en-US')}
        </span>
      </div>
      <p className="text-muted-foreground truncate text-xs">{detail}</p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <SourceCausePill cause={row.cause} />
        <span className="text-muted-foreground font-mono tabular-nums">
          SPF {row.spfPassRate.toFixed(0)}% · DKIM {row.dkimPassRate.toFixed(0)}
          %
        </span>
        <IpLastSeen lastSeen={row.lastSeen} />
      </div>
    </div>
  )
}
