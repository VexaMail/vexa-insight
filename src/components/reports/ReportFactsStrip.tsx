import type { ReportFactsStripProps } from '@/types/reports'
import { formatReportTimestamp } from '@/utils/format'
import { describeOutOf, sumDispositions } from '@/utils/reports'
import { Ban, Clock, Inbox, Network, TriangleAlert } from 'lucide-react'
import { ReportFact } from './ReportFact'

/** Period, sources to review and what the receiver did, in one strip. */
export function ReportFactsStrip({
  report,
  stats,
  sourceCount,
  sources,
}: Readonly<ReportFactsStripProps>) {
  const dispositions = sumDispositions(sources)
  const review = stats.sourcesRequiringReviewCount
  return (
    <dl className="glass-card bg-border grid grid-cols-2 gap-px overflow-hidden sm:grid-cols-3 xl:grid-cols-6">
      <ReportFact icon={<Clock />} label="Period start">
        {formatReportTimestamp(report.beginDate)}
      </ReportFact>
      <ReportFact icon={<Clock />} label="Period end">
        {formatReportTimestamp(report.endDate)}
      </ReportFact>
      <ReportFact
        icon={<Network />}
        label="Sources to review"
        tone={review > 0 ? 'warning' : 'success'}
      >
        {describeOutOf(review, sourceCount, 'source')}
      </ReportFact>
      <ReportFact icon={<Inbox />} label="Disposition none" tone="info">
        {dispositions.none.toLocaleString('en-US')}
      </ReportFact>
      <ReportFact
        icon={<TriangleAlert />}
        label="Quarantine"
        tone={dispositions.quarantine > 0 ? 'warning' : 'neutral'}
      >
        {dispositions.quarantine.toLocaleString('en-US')}
      </ReportFact>
      <ReportFact
        icon={<Ban />}
        label="Reject"
        tone={dispositions.reject > 0 ? 'danger' : 'neutral'}
      >
        {dispositions.reject.toLocaleString('en-US')}
      </ReportFact>
    </dl>
  )
}
