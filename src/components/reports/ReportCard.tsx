'use client'

import type { ReportCardProps } from '@/types/reports'
import { formatReportDateRange } from '@/utils/format'
import { OpenReportLink } from './OpenReportLink'
import { RelatedDomainsCell } from './RelatedDomainsCell'
import { ReportFailingCell } from './ReportFailingCell'
import { ReportIdChip } from './ReportIdChip'
import { ReportOutcomePill } from './ReportOutcomePill'

/** One report as a phone row: outcome, domain, reporter, volume, open. */
export function ReportCard({
  row,
  domainName,
  scopeIds,
}: Readonly<ReportCardProps>) {
  return (
    <li className="space-y-2.5 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <ReportOutcomePill outcome={row.dmarcOutcome} />
        <OpenReportLink
          reportId={row.id}
          domainName={domainName}
          scopeIds={scopeIds}
        />
      </div>
      <RelatedDomainsCell domains={row.relatedDomains} />
      <p className="text-muted-foreground text-xs">
        <span className="text-foreground font-medium">{row.orgName}</span>
        {' · '}
        {formatReportDateRange(row.beginDate, row.endDate)}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <ReportIdChip reportId={row.reportId} visibleChars={14} />
        <span className="text-muted-foreground flex items-baseline gap-1.5 text-xs">
          <span className="text-foreground font-mono text-sm tabular-nums">
            {(row.dmarcOutcome?.totalMessages ?? 0).toLocaleString('en-US')}
          </span>
          messages · failing
          <ReportFailingCell outcome={row.dmarcOutcome} />
        </span>
      </div>
    </li>
  )
}
