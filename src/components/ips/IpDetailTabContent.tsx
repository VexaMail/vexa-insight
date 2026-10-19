import { InlineErrorBlock } from '@/components/ui'
import type { IpDetailTabContentProps } from '@/types/ips'
import { IpDnsTab } from './IpDnsTab'
import { IpOverviewTab } from './IpOverviewTab'
import { IpRawDataTab } from './IpRawDataTab'
import { IpRelatedDomains } from './IpRelatedDomains'
import { IpRelatedReports } from './IpRelatedReports'
import { IpTimelineTab } from './IpTimelineTab'

/** The section the active tab names. */
export function IpDetailTabContent({
  ctx,
  tab,
}: Readonly<IpDetailTabContentProps>) {
  if (tab === 'timeline') return <IpTimelineTab ctx={ctx} />
  if (tab === 'dns') return <IpDnsTab ctx={ctx} />
  if (tab === 'raw') return <IpRawDataTab records={ctx.rawRecords} />
  if (tab === 'domains') {
    return ctx.domains ? (
      <IpRelatedDomains
        initialDomains={ctx.domains}
        ip={ctx.ip}
        dateRange={ctx.dateRange}
      />
    ) : (
      <InlineErrorBlock>
        Related domains are temporarily unavailable.
      </InlineErrorBlock>
    )
  }
  if (tab === 'reports') {
    return ctx.reports ? (
      <IpRelatedReports
        initialReports={ctx.reports}
        ip={ctx.ip}
        dateRange={ctx.dateRange}
      />
    ) : (
      <InlineErrorBlock>
        Related reports are temporarily unavailable.
      </InlineErrorBlock>
    )
  }
  return <IpOverviewTab ctx={ctx} />
}
