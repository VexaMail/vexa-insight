import { formatReportDateRange } from '@/utils/format'
import { FileText } from 'lucide-react'
import Link from 'next/link'
import type { LatestReportRowProps } from './LatestReportRowProps'

/** One report of the latest-reports list, with its first domain when known. */
export function LatestReportRow({ report }: Readonly<LatestReportRowProps>) {
  const domain = report.relatedDomains?.[0]
  return (
    <div className="border-border/30 hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 transition-colors">
      <FileText className="text-primary h-3.5 w-3.5 shrink-0" />
      <div className="min-w-0 flex-1">
        <Link
          href={`/reports/${String(report.id)}`}
          className="text-foreground block truncate font-mono text-xs"
        >
          {report.reportId}
        </Link>
        <div className="text-muted-foreground flex items-center gap-1.5 text-[10px]">
          <span className="truncate">
            {report.orgName} ·{' '}
            {formatReportDateRange(report.beginDate, report.endDate)}
          </span>
          {domain != null && (
            <>
              <span className="shrink-0">·</span>
              <Link
                href={`/domains/${domain.domainName}`}
                className="text-primary/70 hover:text-primary shrink-0 truncate font-medium transition-colors"
              >
                {domain.domainName}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
