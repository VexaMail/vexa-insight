import { StatusPill } from '@/components/ui'
import { DAY_SECONDS } from '@/utils/dates'
import { isLastReportStale } from '@/utils/domains'
import { formatRelativeDate } from '@/utils/format'
import type { LastReportLabelProps } from './LastReportLabelProps'

/** When the domain last got a report, flagged once it has gone silent. */
export function LastReportLabel({
  lastReportDay,
}: Readonly<LastReportLabelProps>) {
  if (lastReportDay == null) {
    return <span className="text-muted-foreground text-sm">Never</span>
  }
  const { relative, absolute } = formatRelativeDate(lastReportDay * DAY_SECONDS)
  return (
    <span className="text-muted-foreground flex items-center gap-2 text-sm whitespace-nowrap">
      <span title={absolute}>{relative}</span>
      {isLastReportStale(lastReportDay) ? (
        <StatusPill tone="warning">Silent</StatusPill>
      ) : null}
    </span>
  )
}
