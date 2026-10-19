import type { ReportSourceItemProps } from '@/types/reports'
import { AuthResultCell } from './AuthResultCell'
import { SourceIpLink } from './SourceIpLink'
import { SourceVerdictCell } from './SourceVerdictCell'

/** Phone summary of one sending source: the same facts as a table row. */
export function ReportSourceCard({ source }: Readonly<ReportSourceItemProps>) {
  return (
    <li className="space-y-3 px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-0.5">
          <SourceIpLink ip={source.ip} countryCode={source.countryCode} />
          <p className="text-muted-foreground truncate font-mono text-xs">
            {source.hostname ?? 'No reverse DNS'}
          </p>
        </div>
        <p className="text-foreground shrink-0 text-right font-mono text-sm tabular-nums">
          {source.messageCount.toLocaleString('en-US')}
          <span className="text-muted-foreground block text-[11px]">
            messages
          </span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <p className="text-muted-foreground text-[11px] uppercase">SPF</p>
          <AuthResultCell
            result={source.spfAuthResult}
            aligned={source.spfAligned}
          />
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground text-[11px] uppercase">DKIM</p>
          <AuthResultCell
            result={source.primaryDkimResult ?? source.dkimResult}
            aligned={source.dkimAligned}
            identity={source.primaryDkimDomain}
          />
        </div>
      </div>
      <SourceVerdictCell source={source} />
    </li>
  )
}
