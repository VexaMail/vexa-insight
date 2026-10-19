import { Panel } from '@/components/ui'
import type { DomainRankPanelProps } from './DomainRankPanelProps'
import { DomainRankRow } from './DomainRankRow'
import { RankedHeader } from './RankedHeader'
import { ViewAllLink } from './ViewAllLink'

/** A short ranked list of domains with messages and pass rate. */
export function DomainRankPanel({
  title,
  description,
  icon,
  domains,
  emptyText,
  className,
}: Readonly<DomainRankPanelProps>) {
  return (
    <Panel
      className={className ?? ''}
      flush
      icon={icon}
      title={title}
      description={description}
      actions={<ViewAllLink href="/domains" />}
    >
      {domains.length === 0 ? (
        <p className="text-muted-foreground p-4 text-sm">{emptyText}</p>
      ) : (
        <>
          <RankedHeader
            labels={['Domain', 'Messages', 'Pass rate']}
            gridClassName="grid-cols-[minmax(0,1fr)_72px_minmax(88px,0.8fr)]"
          />
          <ul className="divide-border divide-y">
            {domains.map((d) => (
              <DomainRankRow key={d.domainId} domain={d} />
            ))}
          </ul>
        </>
      )}
    </Panel>
  )
}
