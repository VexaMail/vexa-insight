import { formatReportDateRange } from '@/utils/format'
import Link from 'next/link'
import type { ReportHeaderProps } from './ReportHeaderProps'

export function ReportHeader({
  report,
  backHref,
  backLabel,
  navigatorSlot,
}: Readonly<ReportHeaderProps>) {
  const dateRange = formatReportDateRange(report.beginDate, report.endDate)

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:outline-zinc-400"
        >
          {backLabel}
        </Link>
        {navigatorSlot}
      </div>
      <div className="flex flex-wrap items-baseline gap-3">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Report {report.reportId}
        </h1>
        {report.relatedDomains?.map((d) => (
          <Link
            key={d.domainId}
            href={`/domains/${d.domainId}`}
            className="rounded-full bg-blue-50 px-3 py-0.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60"
          >
            {d.domainName}
          </Link>
        ))}
        <span className="rounded-full bg-zinc-100 px-3 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {report.orgName}
        </span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {dateRange}
        </span>
      </div>
    </div>
  )
}
