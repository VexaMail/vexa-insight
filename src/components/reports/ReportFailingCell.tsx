import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import type { ReportOutcomePillProps } from '@/types/reports'
import { failingShareTone, percentOf } from '@/utils/reports'

/** Messages failing DMARC in one report, and their share of its total. */
export function ReportFailingCell({
  outcome,
}: Readonly<ReportOutcomePillProps>) {
  const total = outcome?.totalMessages ?? 0
  const failing = outcome?.failingMessages ?? 0
  if (total === 0) return <span className="text-unknown text-xs">No data</span>

  const share = percentOf(failing, total)
  return (
    <span className="inline-flex items-baseline gap-1.5 font-mono text-sm tabular-nums">
      <span
        className={STATUS_TONE_TEXT_CLASSES[failingShareTone(share, total)]}
      >
        {failing.toLocaleString('en-US')}
      </span>
      <span className="text-muted-foreground text-xs">{share}%</span>
    </span>
  )
}
