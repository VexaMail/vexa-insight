'use client'

import type { IpDateRange } from '@/types/filters'
import type { IpLogRow } from '@/types/IpLogRow'
import { useIpEventLogs } from '../../hooks/ips/useIpEventLogs'
import { IpDetailEmptyState } from './IpDetailEmptyState'
import { IpDetailSection } from './IpDetailSection'
import { IpEventLoadMoreButton } from './IpEventLoadMoreButton'
import { IpEventTimelineItem } from './IpEventTimelineItem'

export function IpEventLogs({
  initialLogs,
  ip,
  dateRange,
}: Readonly<{ initialLogs: IpLogRow[]; ip: string; dateRange: IpDateRange }>) {
  const { logs, isLoading, hasMore, handleLoadMore } = useIpEventLogs({
    initialLogs,
    ip,
    dateRange,
  })

  if (logs.length === 0) {
    return (
      <IpDetailSection title="Event Timeline">
        <IpDetailEmptyState message="No recent event records were found for this IP." />
      </IpDetailSection>
    )
  }

  return (
    <IpDetailSection title="Event Timeline">
      <div className="relative mt-2 ml-4 space-y-8 border-l-2 border-gray-100 pb-4 dark:border-gray-800">
        {logs.map((row) => (
          <IpEventTimelineItem key={row.eventId} row={row} />
        ))}
      </div>

      {hasMore ? (
        <IpEventLoadMoreButton
          isLoading={isLoading}
          onLoadMore={() => {
            void handleLoadMore()
          }}
        />
      ) : null}
    </IpDetailSection>
  )
}
