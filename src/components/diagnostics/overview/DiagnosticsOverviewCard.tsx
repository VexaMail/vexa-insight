import { countActionableFindings } from '@/utils/diagnostics'
import type { DiagnosticsOverviewRowProps } from './DiagnosticsOverviewRowProps'
import { OverviewCheckedAt } from './OverviewCheckedAt'
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
      {row.check ? (
        <p className="text-muted-foreground text-xs">
          {countActionableFindings(row.check.protocols)} need action · checked{' '}
          <OverviewCheckedAt row={row} />
        </p>
      ) : null}
    </li>
  )
}
