'use client'

import type { IpDateRange } from '@/types/filters'
import type { IpRelatedDomainRow } from '@/types/IpRelatedDomainRow'
import { formatRelativeDate } from '@/utils/format'
import Link from 'next/link'
import { useIpRelatedDomains } from '../../hooks/ips/useIpRelatedDomains'
import { IpDetailEmptyState } from './IpDetailEmptyState'
import { IpDetailSection } from './IpDetailSection'

export function IpRelatedDomains({
  initialDomains,
  ip,
  dateRange,
}: Readonly<{
  initialDomains: IpRelatedDomainRow[]
  ip: string
  dateRange: IpDateRange
}>) {
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
          <Link
            key={row.domainId}
            href={`/domains/${encodeURIComponent(row.domain)}`}
            className="group hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 flex flex-col justify-between rounded-lg border border-gray-100 bg-white/50 p-4 transition-all sm:flex-row sm:items-center dark:border-gray-800 dark:bg-gray-900/50"
          >
            <div className="flex min-w-0 flex-1 flex-col pr-2 sm:pr-4">
              <span className="truncate font-medium text-gray-900 dark:text-gray-100">
                {row.domain}
              </span>
              <span className="mt-0.5 truncate text-sm text-gray-500">
                {row.lastSeenAt
                  ? `Last active ${formatRelativeDate(row.lastSeenAt).relative}`
                  : 'Unknown activity'}
              </span>
            </div>
            <div className="mt-2 flex shrink-0 items-center text-sm font-medium text-gray-700 sm:mt-0 dark:text-gray-300">
              {row.messageCount.toLocaleString()}{' '}
              {row.messageCount === 1 ? 'message' : 'messages'}
              <svg
                className="group-hover:text-brand-500 ml-4 h-5 w-5 shrink-0 text-gray-400 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {hasMore ? (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => {
              void handleLoadMore()
            }}
            disabled={isLoading}
            className="focus:ring-brand-500 flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            {isLoading ? (
              <>
                <svg
                  className="mr-2 -ml-1 h-4 w-4 animate-spin text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Loading...</span>
              </>
            ) : (
              <span>Load More Domains</span>
            )}
          </button>
        </div>
      ) : null}
    </IpDetailSection>
  )
}
