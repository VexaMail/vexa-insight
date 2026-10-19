import type { IpDetailContextProps } from '@/types/ips'
import { FileText, Globe } from 'lucide-react'
import { IpAuthResultsPanel } from './IpAuthResultsPanel'
import { IpOverviewTimeline } from './IpOverviewTimeline'
import { IpRelatedDomainLink } from './IpRelatedDomainLink'
import { IpRelatedReportLink } from './IpRelatedReportLink'
import { IpSourceInfoPanel } from './IpSourceInfoPanel'
import { IpSummaryList } from './IpSummaryList'

/** Source facts, authentication, related domains and reports, timeline. */
export function IpOverviewTab({ ctx }: Readonly<IpDetailContextProps>) {
  const domains = ctx.domains ?? []
  const reports = ctx.reports ?? []
  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <IpSourceInfoPanel ctx={ctx} />
      <div className="flex min-w-0 flex-col gap-4">
        <IpAuthResultsPanel ctx={ctx} />
        <IpSummaryList
          title="Related domains"
          icon={<Globe />}
          viewAllHref={ctx.tabs.domains.href}
          isEmpty={domains.length === 0}
          emptyText="No related domain in the window."
        >
          {domains.slice(0, 3).map((row) => (
            <IpRelatedDomainLink key={row.domainId} row={row} />
          ))}
        </IpSummaryList>
        <IpSummaryList
          title="Report evidence"
          icon={<FileText />}
          viewAllHref={ctx.tabs.reports.href}
          isEmpty={reports.length === 0}
          emptyText="No aggregate report in the window."
        >
          {reports.slice(0, 3).map((row) => (
            <IpRelatedReportLink key={row.id} row={row} />
          ))}
        </IpSummaryList>
      </div>
      <div className="min-w-0 lg:col-span-2 xl:col-span-1">
        <IpOverviewTimeline ctx={ctx} />
      </div>
    </div>
  )
}
