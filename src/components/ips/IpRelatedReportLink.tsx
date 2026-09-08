import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { IpRelatedReportLinkProps } from './IpRelatedReportLinkProps'

/** One related report of an IP, linking to that report's page. */
export function IpRelatedReportLink({ row }: IpRelatedReportLinkProps) {
  const startDate = new Date(row.reportStartDate * 1000).toLocaleDateString()
  const endDate = new Date(row.reportEndDate * 1000).toLocaleDateString()

  return (
    <Link
      href={`/reports/${String(row.id)}`}
      className="group hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 flex flex-col justify-between rounded-lg border border-gray-100 bg-white/50 p-4 transition-all sm:flex-row sm:items-center dark:border-gray-800 dark:bg-gray-900/50"
    >
      <div className="flex min-w-0 flex-1 flex-col pr-2 sm:pr-4">
        <span className="truncate font-medium text-gray-900 dark:text-gray-100">
          {row.orgName}
        </span>
        <div className="mt-0.5 flex min-w-0 flex-col text-sm text-gray-500 sm:flex-row sm:items-center sm:gap-2">
          <span className="shrink-0">
            {startDate} - {endDate}
          </span>
          <span className="hidden shrink-0 sm:inline">&bull;</span>
          <span className="truncate">{row.reportId}</span>
        </div>
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
