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
      title="Event timeline"
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
        <ol className="border-border relative ml-3 space-y-5 border-l pb-1">
          {logs.map((row) => (
            <IpEventTimelineItem key={row.eventId} row={row} />
          ))}
        </ol>
      )}

      {hasMore ? (
        <IpLoadMoreButton
          isLoading={isLoading}
          label="Load older events"
          onLoadMore={() => {
            void handleLoadMore()
          }}
        />
      ) : null}
    </IpDetailSection>
  )
}
