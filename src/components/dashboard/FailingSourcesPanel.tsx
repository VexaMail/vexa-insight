import { Panel } from '@/components/ui'
import { FAILING_SOURCE_GRID } from '@/constants/dashboard'
import { Waypoints } from 'lucide-react'
import { FailingSourceRow } from './FailingSourceRow'
import type { FailingSourcesPanelProps } from './FailingSourcesPanelProps'
import { RankedHeader } from './RankedHeader'
import { ViewAllLink } from './ViewAllLink'

/** Sending IPs with the most DMARC-failing messages. */
export function FailingSourcesPanel({
  sources,
  trends,
  window,
  className,
}: Readonly<FailingSourcesPanelProps>) {
  return (
    <Panel
      className={className ?? ''}
      flush
      icon={<Waypoints />}
      title="Top failing sending sources"
      description={`Sources with the most DMARC-failing messages, ${window.label}.`}
      actions={<ViewAllLink href="/ips" label="View all sources" />}
    >
      {sources.length === 0 ? (
        <p className="text-muted-foreground p-4 text-sm">
          No source failed DMARC in this period.
        </p>
      ) : (
        <>
          <RankedHeader
            labels={[
              'Sending source',
              'Domain (from)',
              'Total messages',
              'Fail rate',
              'Trend',
              '',
            ]}
            rightAligned={[2, 3]}
            hiddenOnPhone={[1, 4]}
            gridClassName={FAILING_SOURCE_GRID}
          />
          <ul className="divide-border divide-y">
            {sources.map((s) => (
              <FailingSourceRow key={s.ip} source={s} trend={trends[s.ip]} />
            ))}
          </ul>
        </>
      )}
    </Panel>
  )
}
