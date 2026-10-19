import type { IpEventTimelineItemProps } from '@/types/ips'
import { formatRelativeDate } from '@/utils/format'
import { formatMessageCount } from '@/utils/ips'
import Link from 'next/link'

/** Header-from domain, observation date, volume and disposition. */
export function IpEventHeading({ row }: Readonly<IpEventTimelineItemProps>) {
  const observed = formatRelativeDate(row.observedAt)
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <Link
          href={`/domains/${encodeURIComponent(row.headerFrom)}`}
          className="text-foreground hover:text-primary min-w-0 truncate text-sm font-semibold"
        >
          {row.headerFrom}
        </Link>
        <time className="text-muted-foreground text-xs">
          {observed.absolute} · {observed.relative}
        </time>
      </div>
      <p className="text-muted-foreground mt-0.5 text-xs">
        {formatMessageCount(row.count)} · disposition{' '}
        <span className="text-foreground font-medium">{row.disposition}</span>
      </p>
    </>
  )
}
