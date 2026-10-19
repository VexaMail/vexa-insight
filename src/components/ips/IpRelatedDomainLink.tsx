import { formatRelativeDate } from '@/utils/format'
import { ChevronRight, Globe } from 'lucide-react'
import Link from 'next/link'
import type { IpRelatedDomainLinkProps } from './IpRelatedDomainLinkProps'

/** One related domain of an IP, linking to that domain's page. */
export function IpRelatedDomainLink({ row }: IpRelatedDomainLinkProps) {
  const messages = `${row.messageCount.toLocaleString('en-US')} ${row.messageCount === 1 ? 'message' : 'messages'}`
  const active = row.lastSeenAt
    ? `Last active ${formatRelativeDate(row.lastSeenAt).relative}`
    : 'Unknown activity'
  return (
    <Link
      href={`/domains/${encodeURIComponent(row.domain)}`}
      className="group border-border hover:border-primary/40 hover:bg-accent/50 flex min-h-12 items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors duration-150"
    >
      <Globe
        className="text-muted-foreground h-4 w-4 shrink-0"
        aria-hidden="true"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-foreground truncate text-sm font-medium">
          {row.domain}
        </span>
        <span className="text-muted-foreground truncate text-xs">
          {active} · {messages}
        </span>
      </div>
      <ChevronRight
        className="text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-colors"
        aria-hidden="true"
      />
    </Link>
  )
}
