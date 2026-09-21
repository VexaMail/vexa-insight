'use client'

import { ipLogsQueryDefaults } from '@/constants/ips'
import { useIpEventLogs } from '@/hooks/ips'
import { IpDetailEmptyState } from './IpDetailEmptyState'
import { IpDetailSection } from './IpDetailSection'
import type { IpEventLogsProps } from './IpEventLogsProps'
import { IpEventLogsToolbar } from './IpEventLogsToolbar'
import { IpEventTimelineItem } from './IpEventTimelineItem'
import { IpLoadMoreButton } from './IpLoadMoreButton'

export function IpEventLogs({ initialLogs, ip, dateRange }: IpEventLogsProps) {
  const { logs, query, isLoading, hasMore, handleQueryChange, handleLoadMore } =
    useIpEventLogs({ initialLogs, ip, dateRange })

  const isFiltered =
    query.search !== ipLogsQueryDefaults.search ||
    query.disposition !== ipLogsQueryDefaults.disposition ||
    query.spfResult !== ipLogsQueryDefaults.spfResult ||
    query.dkimResult !== ipLogsQueryDefaults.dkimResult

  return (
    <IpDetailSection
      title="Event Timeline"
      toolbar={
        <IpEventLogsToolbar query={query} onChange={handleQueryChange} />
      }
    >
      {logs.length === 0 ? (
        <IpDetailEmptyState
          message={
            isFiltered
              ? 'No event matches these filters.'
              : 'No recent event records were found for this IP.'
          }
        />
      ) : (
        <div className="relative mt-2 ml-4 space-y-8 border-l-2 border-gray-100 pb-4 dark:border-gray-800">
          {logs.map((row) => (
            <IpEventTimelineItem key={row.eventId} row={row} />
          ))}
        </div>
      )}

      {hasMore ? (
        <IpLoadMoreButton
          isLoading={isLoading}
          label="Load Older Events"
          onLoadMore={() => {
            void handleLoadMore()
          }}
        />
      ) : null}
    </IpDetailSection>
  )
}
