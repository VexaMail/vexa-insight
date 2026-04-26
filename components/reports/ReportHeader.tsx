import { formatReportDateRange } from '@/utils/format'
import { Building2, Calendar, ExternalLink, Hash } from 'lucide-react'
import Link from 'next/link'
import type { ReportHeaderProps } from './ReportHeaderProps'

export function ReportHeader({
  report,
  backHref,
  backLabel,
  navigatorSlot,
}: Readonly<ReportHeaderProps>) {
  const dateRange = formatReportDateRange(report.beginDate, report.endDate)
  const domains = report.relatedDomains ?? []
  const primaryDomain = domains[0]
  const otherDomains = domains.slice(1)

  return (
    <header className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={backHref}
          className="bg-foreground text-background hover:bg-foreground/90 focus-visible:outline-ring inline-flex w-fit items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {backLabel}
        </Link>
        {navigatorSlot}
      </div>

      <div className="space-y-3">
        <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
          DMARC aggregate report
        </p>

        {primaryDomain ? (
          <Link
            href={`/domains/${encodeURIComponent(primaryDomain.domainName)}`}
            className="group focus-visible:outline-primary inline-flex max-w-full items-baseline gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <h1 className="text-foreground group-hover:text-primary font-display text-3xl font-semibold tracking-tight break-all transition-colors sm:text-4xl">
              {primaryDomain.domainName}
            </h1>
            <ExternalLink
              className="text-muted-foreground h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          </Link>
        ) : (
          <h1 className="text-foreground font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Report {report.reportId}
          </h1>
        )}

        <dl className="text-muted-foreground flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <div className="inline-flex items-center gap-1.5">
            <Building2
              className="h-4 w-4 shrink-0 opacity-70"
              aria-hidden="true"
            />
            <dt className="sr-only">Reporting organization</dt>
            <dd className="text-foreground font-medium">{report.orgName}</dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Calendar
              className="h-4 w-4 shrink-0 opacity-70"
              aria-hidden="true"
            />
            <dt className="sr-only">Date range</dt>
            <dd>{dateRange}</dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Hash
              className="h-3.5 w-3.5 shrink-0 opacity-70"
              aria-hidden="true"
            />
            <dt className="sr-only">Report ID</dt>
            <dd className="font-mono text-xs">{report.reportId}</dd>
          </div>
        </dl>

        {otherDomains.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-muted-foreground text-xs">Also covers</span>
            {otherDomains.map((d) => (
              <Link
                key={d.domainId}
                href={`/domains/${encodeURIComponent(d.domainName)}`}
                className="border-border bg-card text-foreground hover:border-primary/40 hover:text-primary rounded-full border px-2.5 py-0.5 text-xs font-medium transition"
              >
                {d.domainName}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  )
}
