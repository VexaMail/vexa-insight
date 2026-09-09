import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { ReportHeaderTitleProps } from './ReportHeaderTitleProps'

/** The report title: a link to its first domain, or the raw report ID. */
export function ReportHeaderTitle({
  primaryDomain,
  reportId,
}: Readonly<ReportHeaderTitleProps>) {
  if (!primaryDomain) {
    return (
      <h1 className="text-foreground font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Report {reportId}
      </h1>
    )
  }

  return (
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
  )
}
