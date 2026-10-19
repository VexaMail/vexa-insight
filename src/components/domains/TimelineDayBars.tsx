import { STATUS_TONE_DOT_CLASSES } from '@/constants/ui'
import type { DomainHistoryTabProps } from '@/types/domains'
import { complianceTone } from '@/utils/domains'
import { formatDate, formatPercent } from '@/utils/format'

/** One bar per reported day, its height the DMARC pass rate. */
export function TimelineDayBars({ timeline }: Readonly<DomainHistoryTabProps>) {
  return (
    <div
      className="flex h-28 items-end gap-px"
      role="img"
      aria-label="Daily DMARC pass rate"
    >
      {timeline.days.map((day) => {
        const rate = day.total === 0 ? 0 : (day.aligned / day.total) * 100
        return (
          <div
            key={day.day}
            title={`${formatDate(new Date(day.day * 86_400_000))}: ${formatPercent(rate)} of ${day.total.toLocaleString('en-US')}`}
            className={`min-w-1 flex-1 rounded-t-sm ${STATUS_TONE_DOT_CLASSES[complianceTone(rate)]} opacity-80`}
            style={{ height: `${String(Math.max(rate, 3))}%` }}
          />
        )
      })}
    </div>
  )
}
