'use client'

import { useIpRelatedDomains } from '@/hooks/ips'
import { IpDetailEmptyState } from './IpDetailEmptyState'
import { IpDetailSection } from './IpDetailSection'
import { IpLoadMoreButton } from './IpLoadMoreButton'
import { IpRelatedDomainLink } from './IpRelatedDomainLink'
import type { IpRelatedDomainsProps } from './IpRelatedDomainsProps'

export function IpRelatedDomains({
  initialDomains,
  ip,
  dateRange,
}: IpRelatedDomainsProps) {
  const { domains, isLoading, hasMore, handleLoadMore } = useIpRelatedDomains({
    initialDomains,
    ip,
    dateRange,
  })

  if (domains.length === 0) {
    return (
      <IpDetailSection title="Related Domains">
        <IpDetailEmptyState message="No related domains were found for this IP." />
      </IpDetailSection>
    )
  }

  return (
    <IpDetailSection title="Related Domains">
      <div className="flex flex-col space-y-2">
        {domains.map((row) => (
          <IpRelatedDomainLink key={row.domainId} row={row} />
        ))}
      </div>

      {hasMore ? (
        <IpLoadMoreButton
          isLoading={isLoading}
          label="Load More Domains"
          onLoadMore={() => {
            void handleLoadMore()
          }}
        />
      ) : null}
    </IpDetailSection>
  )
}
