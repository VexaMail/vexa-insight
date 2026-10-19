import { formatRelativeDate } from '@/utils/format'
import { ChevronRight, FileText } from 'lucide-react'
import Link from 'next/link'
import type { IpRelatedReportLinkProps } from './IpRelatedReportLinkProps'

/** One related report of an IP, linking to that report's page. */
export function IpRelatedReportLink({ row }: IpRelatedReportLinkProps) {
  const startDate = formatRelativeDate(row.reportStartDate).absolute
  const endDate = formatRelativeDate(row.reportEndDate).absolute
  const messages = `${row.messageCount.toLocaleString()} ${row.messageCount === 1 ? 'message' : 'messages'}`
  return (
    <Link
      href={`/reports/${String(row.id)}`}
      className="group border-border hover:border-primary/40 hover:bg-accent/50 flex min-h-12 items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors duration-150"
    >
      <FileText
        className="text-muted-foreground h-4 w-4 shrink-0"
        aria-hidden="true"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-foreground truncate text-sm font-medium">
          {row.orgName}
        </span>
        <span className="text-muted-foreground truncate text-xs">
          {startDate} – {endDate} · {messages}
        </span>
        <span className="text-muted-foreground truncate font-mono text-[11px]">
          {row.reportId}
        </span>
      </div>
      <ChevronRight
        className="text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-colors"
        aria-hidden="true"
      />
    </Link>
  )
}
