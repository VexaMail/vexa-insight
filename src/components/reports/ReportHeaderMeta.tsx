import { Building2, Calendar, Hash } from 'lucide-react'
import type { ReportHeaderMetaProps } from './ReportHeaderMetaProps'

/** Organization, date range and report ID as a screen-reader-labelled list. */
export function ReportHeaderMeta({
  orgName,
  dateRange,
  reportId,
}: Readonly<ReportHeaderMetaProps>) {
  return (
    <dl className="text-muted-foreground flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      <div className="inline-flex items-center gap-1.5">
        <Building2 className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
        <dt className="sr-only">Reporting organization</dt>
        <dd className="text-foreground font-medium">{orgName}</dd>
      </div>
      <div className="inline-flex items-center gap-1.5">
        <Calendar className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
        <dt className="sr-only">Date range</dt>
        <dd>{dateRange}</dd>
      </div>
      <div className="inline-flex items-center gap-1.5">
        <Hash className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
        <dt className="sr-only">Report ID</dt>
        <dd className="font-mono text-xs">{reportId}</dd>
      </div>
    </dl>
  )
}
