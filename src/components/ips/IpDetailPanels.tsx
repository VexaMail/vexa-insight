import { InlineErrorBlock } from '@/components/ui'
import type { IpDetailPanelsProps } from './IpDetailPanelsProps'
import { IpEventLogs } from './IpEventLogs'
import { IpRelatedDomains } from './IpRelatedDomains'
import { IpRelatedReports } from './IpRelatedReports'

/**
 * Related domains, related reports and the event timeline of one IP. Each
 * section renders an inline error when its own query failed, so one broken
 * panel does not take the page down.
 */
export function IpDetailPanels({
  ip,
  dateRange,
  domains,
  reports,
  logs,
}: IpDetailPanelsProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="w-full space-y-6 lg:w-1/3">
        {domains ? (
          <IpRelatedDomains
            initialDomains={domains}
            ip={ip}
            dateRange={dateRange}
          />
        ) : (
          <InlineErrorBlock>
            Related domains section is temporarily unavailable.
          </InlineErrorBlock>
        )}

        {reports ? (
          <IpRelatedReports
            initialReports={reports}
            ip={ip}
            dateRange={dateRange}
          />
        ) : (
          <InlineErrorBlock>
            Related reports section is temporarily unavailable.
          </InlineErrorBlock>
        )}
      </div>

      <div className="w-full space-y-6 lg:w-2/3">
        {logs ? (
          <IpEventLogs initialLogs={logs} ip={ip} dateRange={dateRange} />
        ) : (
          <InlineErrorBlock>
            Available logs section is temporarily unavailable.
          </InlineErrorBlock>
        )}
      </div>
    </div>
  )
}
