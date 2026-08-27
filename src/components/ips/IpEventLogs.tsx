'use client'

import type { IpDateRange } from '@/types/filters'
import type { IpLogRow } from '@/types/IpLogRow'
import { formatRelativeDate } from '@/utils/format'
import { useIpEventLogs } from '../../hooks/ips/useIpEventLogs'
import { IpDetailEmptyState } from './IpDetailEmptyState'
import { IpDetailSection } from './IpDetailSection'

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
          <div key={row.eventId} className="group relative pl-6">
            {/* Timeline Dot */}
            <span className="bg-brand-100 dark:bg-brand-900/40 group-hover:bg-brand-200 dark:group-hover:bg-brand-800/80 absolute top-1 -left-[11px] flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-white transition-colors dark:ring-gray-950">
              <svg
                className="text-brand-600 dark:text-brand-400 h-3 w-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </span>

            {/* Header / Date */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {row.headerFrom}
              </h3>
              <time className="mt-1 text-xs font-medium text-gray-500 sm:mt-0">
                {formatRelativeDate(row.observedAt).absolute} —{' '}
                {formatRelativeDate(row.observedAt).relative}
              </time>
            </div>

            {/* Detail Badges */}
            <div className="mt-2.5 flex flex-wrap gap-2 text-[11px] tracking-wider uppercase">
              {/* Disposition Badge */}
              <div className="flex items-center space-x-1.5 rounded border border-gray-200 bg-white px-2 py-1 shadow-sm dark:border-gray-800 dark:bg-[#0A0A0A]">
                <span className="font-semibold text-gray-400">Action:</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">
                  {row.disposition}
                </span>
              </div>

              {/* SPF Badge */}
              <div className="flex items-center space-x-1.5 rounded border border-gray-200 bg-white px-2 py-1 shadow-sm dark:border-gray-800 dark:bg-[#0A0A0A]">
                <span className="font-semibold text-gray-400">SPF:</span>
                <span
                  className={`font-bold ${row.spfResult === 'pass' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                >
                  {row.spfResult}
                </span>
              </div>

              {/* DKIM Badge */}
              <div className="flex items-center space-x-1.5 rounded border border-gray-200 bg-white px-2 py-1 shadow-sm dark:border-gray-800 dark:bg-[#0A0A0A]">
                <span className="font-semibold text-gray-400">DKIM:</span>
                <span
                  className={`font-bold ${row.dkimResult === 'pass' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                >
                  {row.dkimResult}
                </span>
              </div>

              {/* Volume Badge */}
              <div className="flex items-center space-x-1.5 rounded border border-gray-200 bg-white px-2 py-1 shadow-sm dark:border-gray-800 dark:bg-[#0A0A0A]">
                <span className="font-semibold text-gray-400">Volume:</span>
                <span className="text-brand-600 dark:text-brand-400 font-bold">
                  {row.count.toLocaleString()}
                </span>
              </div>

              {/* Source Report */}
              {row.reportId !== '' && (
                <div className="flex max-w-[200px] items-center space-x-1.5 rounded border border-gray-200 bg-white px-2 py-1 text-gray-400 shadow-sm sm:max-w-xs dark:border-gray-800 dark:bg-[#0A0A0A]">
                  <span className="font-semibold">Context:</span>
                  <span className="truncate font-medium">{row.reportId}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {hasMore === true && (
        <div className="flex justify-center pt-6">
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
              <span>Load Older Events</span>
            )}
          </button>
        </div>
      )}
    </IpDetailSection>
  )
}
