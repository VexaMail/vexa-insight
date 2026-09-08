'use client'

import { useIpRelatedReports } from '@/hooks/ips'
import { IpDetailEmptyState } from './IpDetailEmptyState'
import { IpDetailSection } from './IpDetailSection'
import { IpLoadMoreButton } from './IpLoadMoreButton'
import { IpRelatedReportLink } from './IpRelatedReportLink'
import type { IpRelatedReportsProps } from './IpRelatedReportsProps'

export function IpRelatedReports({
  initialReports,
  ip,
  dateRange,
}: IpRelatedReportsProps) {
  const { reports, isLoading, hasMore, handleLoadMore } = useIpRelatedReports({
    initialReports,
    ip,
    dateRange,
  })

  if (reports.length === 0) {
    return (
      <IpDetailSection title="Related Reports">
        <IpDetailEmptyState message="No related reports were found for this IP." />
      </IpDetailSection>
    )
  }

  return (
    <IpDetailSection title="Related Reports">
      <div className="flex flex-col space-y-2">
        {reports.map((row) => (
          <IpRelatedReportLink key={row.id} row={row} />
        ))}
      </div>

      {hasMore ? (
        <IpLoadMoreButton
          isLoading={isLoading}
          label="Load More Reports"
          onLoadMore={() => {
            void handleLoadMore()
          }}
        />
      ) : null}
    </IpDetailSection>
  )
}
