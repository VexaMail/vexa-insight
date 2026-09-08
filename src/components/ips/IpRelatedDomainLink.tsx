import { formatRelativeDate } from '@/utils/format'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { IpRelatedDomainLinkProps } from './IpRelatedDomainLinkProps'

/** One related domain of an IP, linking to that domain's page. */
export function IpRelatedDomainLink({ row }: IpRelatedDomainLinkProps) {
  return (
    <Link
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
        <ChevronRight
          className="group-hover:text-brand-500 ml-4 h-5 w-5 shrink-0 text-gray-400 transition-colors"
          aria-hidden="true"
        />
      </div>
    </Link>
  )
}
