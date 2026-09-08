'use client'

import { useTopDomainsTable } from '@/hooks/dashboard'
import { RankedListCard } from './RankedListCard'
import { RankedListEmpty } from './RankedListEmpty'
import { RankedListSkeleton } from './RankedListSkeleton'
import { TopDomainRow } from './TopDomainRow'

export default function TopDomainsTable() {
  const { maxMessages, topDomains, isLoading } = useTopDomainsTable()

  return (
    <RankedListCard title="Top Domains">
      {isLoading ? <RankedListSkeleton /> : null}
      {!isLoading && topDomains.length === 0 && (
        <RankedListEmpty message="No domains yet. Ingest DMARC reports to see top domains." />
      )}
      {!isLoading && topDomains.length > 0 && (
        <div className="space-y-3">
          {topDomains.map((domain) => (
            <TopDomainRow
              key={domain.domainId}
              domain={domain}
              maxMessages={maxMessages}
            />
          ))}
        </div>
      )}
    </RankedListCard>
  )
}
