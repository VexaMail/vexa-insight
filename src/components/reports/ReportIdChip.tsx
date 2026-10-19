import { CopyIconButton } from '@/components/ui'
import type { ReportIdChipProps } from '@/types/reports'
import { truncateMiddle } from '@/utils/reports'

/** A report id in mono, shortened in the middle, with the full value on hover and copy. */
export function ReportIdChip({
  reportId,
  visibleChars = 18,
}: Readonly<ReportIdChipProps>) {
  return (
    <span className="border-border bg-secondary inline-flex h-7 max-w-full min-w-0 items-center gap-0.5 rounded-md border pl-2">
      <span
        className="text-foreground truncate font-mono text-xs"
        title={reportId}
      >
        {truncateMiddle(reportId, visibleChars)}
      </span>
      <CopyIconButton value={reportId} label="report ID" className="h-6 w-6" />
    </span>
  )
}
