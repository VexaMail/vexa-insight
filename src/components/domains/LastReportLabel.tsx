import { StatusPill } from '@/components/ui'
import { isLastReportStale } from '@/utils/domains'
import { formatRelativeDate } from '@/utils/format'
import type { LastReportLabelProps } from './LastReportLabelProps'

/** When the newest report period ended, flagged once the domain went silent. */
export function LastReportLabel({
  reportedAt,
  lastReportDay,
}: Readonly<LastReportLabelProps>) {
  if (reportedAt == null) {
    return <span className="text-muted-foreground text-sm">Never</span>
  }
  const { relative, absolute } = formatRelativeDate(reportedAt)
  return (
    <span className="text-muted-foreground flex items-center gap-2 text-sm whitespace-nowrap">
      <span title={`Newest report period ended ${absolute}`}>{relative}</span>
      {isLastReportStale(lastReportDay) ? (
        <StatusPill tone="warning">Silent</StatusPill>
      ) : null}
    </span>
  )
}
