import { Panel } from '@/components/ui'
import { FAILING_SOURCE_GRID, OVERVIEW_TABLE_ROWS } from '@/constants/dashboard'
import { Waypoints } from 'lucide-react'
import { FailingSourceRow } from './FailingSourceRow'
import type { FailingSourcesPanelProps } from './FailingSourcesPanelProps'
import { RankedHeader } from './RankedHeader'
import { ViewAllLink } from './ViewAllLink'

/** Sending IPs with the most DMARC-failing messages. */
export function FailingSourcesPanel({
  sources,
  window,
  className,
}: Readonly<FailingSourcesPanelProps>) {
  const shown = sources.slice(0, OVERVIEW_TABLE_ROWS)
  return (
    <Panel
      className={className ?? ''}
      flush
      icon={<Waypoints />}
      title="Top failing sending sources"
      description={`Most DMARC-failing messages, ${window.label}`}
      actions={<ViewAllLink href="/ips" />}
    >
      {shown.length === 0 ? (
        <p className="text-muted-foreground p-4 text-sm">
          No source failed DMARC in this period.
        </p>
      ) : (
        <>
          <RankedHeader
            labels={[
              'IP address',
              'Domain (example)',
              'Fail rate',
              'Messages',
              '',
            ]}
            rightAligned={[2, 3]}
            gridClassName={FAILING_SOURCE_GRID}
          />
          <ul className="divide-border divide-y">
            {shown.map((s) => (
              <FailingSourceRow key={s.ip} source={s} />
            ))}
          </ul>
        </>
      )}
    </Panel>
  )
}
