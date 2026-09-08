'use client'

import { TOP_IP_SENDERS_SHOWN } from '@/constants/dashboard'
import { useTopIpSendersTable } from '@/hooks/dashboard'
import type { MouseEvent } from 'react'
import { RankedListCard } from './RankedListCard'
import { RankedListEmpty } from './RankedListEmpty'
import { RankedListSkeleton } from './RankedListSkeleton'
import { TopIpSenderRow } from './TopIpSenderRow'

export default function TopIpSendersTable() {
  const { ips, maxMessages, refreshingIps, handleRefreshClick, isLoading } =
    useTopIpSendersTable()

  return (
    <RankedListCard title="Top IP Senders">
      {isLoading ? <RankedListSkeleton /> : null}
      {!isLoading && ips.length === 0 && (
        <RankedListEmpty message="No IP data yet. Ingest DMARC reports to see top senders." />
      )}
      {!isLoading && ips.length > 0 && (
        <div className="space-y-3">
          {ips.slice(0, TOP_IP_SENDERS_SHOWN).map((sender) => (
            <TopIpSenderRow
              key={sender.ip}
              sender={sender}
              maxMessages={maxMessages}
              isRefreshing={refreshingIps.has(sender.ip)}
              onRefresh={(event) => {
                // handleRefreshClick reads the IP off the button it was fired
                // from, so the attribute has to be set before it is called.
                event.currentTarget.setAttribute('data-sender-ip', sender.ip)
                handleRefreshClick(event as MouseEvent<HTMLButtonElement>)
              }}
            />
          ))}
        </div>
      )}
    </RankedListCard>
  )
}
