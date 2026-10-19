import { StatusPill } from '@/components/ui'
import type { IpEventTimelineItemProps } from '@/types/ips'
import Link from 'next/link'

/** The aggregate report the event came from. */
export function IpEventReportLink({ row }: Readonly<IpEventTimelineItemProps>) {
  return (
    <Link
      href={`/reports/${String(row.reportDbId)}`}
      className="border-border hover:border-primary/40 hover:bg-accent/50 mt-2 flex min-h-9 min-w-0 items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs transition-colors duration-150"
    >
      <StatusPill tone="info">Report</StatusPill>
      <span className="text-foreground shrink-0">{row.orgName}</span>
      <span className="text-muted-foreground min-w-0 truncate font-mono">
        {row.reportId}
      </span>
    </Link>
  )
}
