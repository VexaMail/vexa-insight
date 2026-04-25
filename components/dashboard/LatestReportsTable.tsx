'use client'

import { useLatestReportsTable } from '@/hooks/dashboard'
import { formatReportDateRange } from '@/utils/format'
import { FileText } from 'lucide-react'
import Link from 'next/link'

import { Skeleton } from '@/components/ui'

export default function LatestReportsTable() {
  const { reports, isLoading } = useLatestReportsTable()

  if (isLoading) {
    return (
      <div className="glass-card p-5">
        <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
          Latest Reports
        </h3>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2 p-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (reports.length === 0) {
    return (
      <div className="glass-card p-5">
        <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
          Latest Reports
        </h3>
        <div className="border-border/50 flex h-32 items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground text-sm">
            No reports yet. Upload or ingest DMARC reports.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-5">
      <h3 className="font-display text-foreground mb-4 text-sm font-semibold">
        Latest Reports
      </h3>

      <div className="space-y-2.5">
        {reports.slice(0, 15).map((r) => {
          const domain = r.relatedDomains?.[0]
          return (
            <div
              key={r.id}
              className="border-border/30 hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 transition-colors"
            >
              <FileText className="text-primary h-3.5 w-3.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <Link
                  href={`/reports/${r.id}`}
                  className="text-foreground block truncate font-mono text-xs"
                >
                  {r.reportId}
                </Link>
                <div className="text-muted-foreground flex items-center gap-1.5 text-[10px]">
                  <span className="truncate">
                    {r.orgName} ·{' '}
                    {formatReportDateRange(r.beginDate, r.endDate)}
                  </span>
                  {domain && (
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
        })}
      </div>
    </div>
  )
}
