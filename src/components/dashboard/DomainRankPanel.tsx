import { Panel } from '@/components/ui'
import { DOMAIN_RANK_GRID } from '@/constants/dashboard'
import { ShieldAlert } from 'lucide-react'
import type { DomainRankPanelProps } from './DomainRankPanelProps'
import { DomainRankRow } from './DomainRankRow'
import { RankedHeader } from './RankedHeader'
import { ViewAllLink } from './ViewAllLink'

/** Domains with the lowest DMARC pass rate, with their fail-rate trend. */
export function DomainRankPanel({
  domains,
  trends,
  description,
  className,
}: Readonly<DomainRankPanelProps>) {
  return (
    <Panel
      className={className ?? ''}
      flush
      icon={<ShieldAlert />}
      title="Lowest domain compliance"
      description={description}
      actions={<ViewAllLink href="/domains" label="View all domains" />}
    >
      {domains.length === 0 ? (
        <p className="text-muted-foreground p-4 text-sm">
          No domain has enough messages to judge.
        </p>
      ) : (
        <>
          <RankedHeader
            labels={[
              'Domain',
              'Total messages',
              'Pass rate',
              'Fail rate',
              'Trend',
            ]}
            rightAligned={[1, 2, 3]}
            hiddenOnPhone={[3, 4]}
            gridClassName={DOMAIN_RANK_GRID}
          />
          <ul className="divide-border divide-y">
            {domains.map((d) => (
              <DomainRankRow
                key={d.domainId}
                domain={d}
                trend={trends[String(d.domainId)]}
              />
            ))}
          </ul>
        </>
      )}
    </Panel>
  )
}
