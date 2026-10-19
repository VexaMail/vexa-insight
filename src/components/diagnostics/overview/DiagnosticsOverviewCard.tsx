import { countActionableFindings } from '@/utils/diagnostics'
import { formatRunAt } from '@/utils/format'
import type { DiagnosticsOverviewRowProps } from './DiagnosticsOverviewRowProps'
import { OverviewDomainLink } from './OverviewDomainLink'
import { OverviewProtocols } from './OverviewProtocols'
import { OverviewScore } from './OverviewScore'

/** Phone row: domain and score, then the protocol dots and the run time. */
export function DiagnosticsOverviewCard({
  row,
}: Readonly<DiagnosticsOverviewRowProps>) {
  return (
    <li className="space-y-2 px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <OverviewDomainLink row={row} />
        <OverviewScore row={row} />
      </div>
      <OverviewProtocols row={row} />
      <p className="text-muted-foreground text-xs">
        {countActionableFindings(row.findings)} need action · checked{' '}
        <time dateTime={row.checkedAt} className="font-mono">
          {formatRunAt(new Date(row.checkedAt))}
        </time>
      </p>
    </li>
  )
}
