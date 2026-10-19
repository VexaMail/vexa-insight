import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { ComplianceBar } from './ComplianceBar'
import { DomainHealthPill } from './DomainHealthPill'
import { DomainPolicyChip } from './DomainPolicyChip'
import type { DomainsPhoneListProps } from './DomainsPhoneListProps'
import { LastReportLabel } from './LastReportLabel'

/** The domains list as row summaries, for phone widths. */
export function DomainsPhoneList({
  rows,
  onNavigate,
}: Readonly<DomainsPhoneListProps>) {
  return (
    <ul className="glass-card divide-border divide-y md:hidden">
      {rows.map((row) => (
        <li key={row.domainId}>
          <Link
            href={`/domains/${encodeURIComponent(row.domainName)}`}
            onClick={onNavigate}
            className="hover:bg-accent flex min-h-11 items-center gap-3 px-4 py-3 transition-colors duration-150"
          >
            <span className="min-w-0 flex-1 space-y-2">
              <span className="flex items-center justify-between gap-2">
                <span className="text-foreground truncate text-sm font-medium">
                  {row.domainName}
                </span>
                <DomainHealthPill {...row} />
              </span>
              {row.totalMessages > 0 ? (
                <ComplianceBar passRate={row.passRatePercent} />
              ) : null}
              <span className="flex flex-wrap items-center gap-2 text-xs">
                <DomainPolicyChip policy={row.policy} />
                <span className="text-muted-foreground font-mono tabular-nums">
                  {row.totalMessages.toLocaleString('en-US')} msgs
                </span>
                <LastReportLabel lastReportDay={row.lastReportDay} />
              </span>
            </span>
            <ChevronRight
              className="text-muted-foreground h-4 w-4 shrink-0"
              aria-hidden
            />
          </Link>
        </li>
      ))}
      {rows.length === 0 ? (
        <li className="text-muted-foreground p-6 text-center text-sm">
          No domain matches the filter.
        </li>
      ) : null}
    </ul>
  )
}
