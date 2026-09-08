import type { IpLogRow } from '@/types/IpLogRow'
import { formatRelativeDate } from '@/utils/format'
import { authResultClassName } from '@/utils/ips'
import { IpEventBadge } from './IpEventBadge'
import { IpEventTimelineDot } from './IpEventTimelineDot'

/** One event of the IP timeline: its header, date and result badges. */
export function IpEventTimelineItem({ row }: Readonly<{ row: IpLogRow }>) {
  const observed = formatRelativeDate(row.observedAt)

  return (
    <div className="group relative pl-6">
      <IpEventTimelineDot />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {row.headerFrom}
        </h3>
        <time className="mt-1 text-xs font-medium text-gray-500 sm:mt-0">
          {observed.absolute} — {observed.relative}
        </time>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-2 text-[11px] tracking-wider uppercase">
        <IpEventBadge label="Action">
          <span className="font-bold text-gray-900 dark:text-gray-100">
            {row.disposition}
          </span>
        </IpEventBadge>
        <IpEventBadge label="SPF">
          <span className={authResultClassName(row.spfResult)}>
            {row.spfResult}
          </span>
        </IpEventBadge>
        <IpEventBadge label="DKIM">
          <span className={authResultClassName(row.dkimResult)}>
            {row.dkimResult}
          </span>
        </IpEventBadge>
        <IpEventBadge label="Volume">
          <span className="text-brand-600 dark:text-brand-400 font-bold">
            {row.count.toLocaleString()}
          </span>
        </IpEventBadge>
        {row.reportId !== '' && (
          <IpEventBadge
            label="Context"
            className="max-w-[200px] text-gray-400 sm:max-w-xs"
          >
            <span className="truncate font-medium">{row.reportId}</span>
          </IpEventBadge>
        )}
      </div>
    </div>
  )
}
