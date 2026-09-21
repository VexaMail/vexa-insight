'use client'

import { useIpRelatedDomains } from '@/hooks/ips'
import { IpDetailEmptyState } from './IpDetailEmptyState'
import { IpDetailSection } from './IpDetailSection'
import { IpLoadMoreButton } from './IpLoadMoreButton'
import { IpRelatedDomainLink } from './IpRelatedDomainLink'
import type { IpRelatedDomainsProps } from './IpRelatedDomainsProps'
import { IpRelatedDomainsToolbar } from './IpRelatedDomainsToolbar'

export function IpRelatedDomains({
  initialDomains,
  ip,
  dateRange,
}: IpRelatedDomainsProps) {
  const {
    domains,
    query,
    isLoading,
    hasMore,
    handleQueryChange,
    handleLoadMore,
  } = useIpRelatedDomains({ initialDomains, ip, dateRange })

  return (
    <IpDetailSection
      title="Related Domains"
      toolbar={
        <IpRelatedDomainsToolbar query={query} onChange={handleQueryChange} />
      }
    >
      {domains.length === 0 ? (
        <IpDetailEmptyState
          message={
            query.search === ''
              ? 'No related domains were found for this IP.'
              : 'No related domain matches this search.'
          }
        />
      ) : (
        <div className="flex flex-col space-y-2">
          {domains.map((row) => (
            <IpRelatedDomainLink key={row.domainId} row={row} />
          ))}
        </div>
      )}

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
