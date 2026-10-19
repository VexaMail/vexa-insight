import { formatCount } from '@/utils/dashboard'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { ActionLastSeen } from './ActionLastSeen'
import type { ActionQueueRowProps } from './ActionQueueRowProps'
import { SeverityPill } from './SeverityPill'

/**
 * One queue item. On a phone it stacks as severity, subject and impact, then
 * the issue and when it was last seen; from `lg` it is a six-column row.
 */
export function ActionQueueRow({ item }: Readonly<ActionQueueRowProps>) {
  return (
    <li>
      <Link
        href={item.href}
        className="hover:bg-accent/60 focus-visible:ring-ring grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 px-4 py-3 transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset lg:grid-cols-[88px_minmax(0,1fr)_minmax(0,1.35fr)_84px_92px_16px]"
      >
        <SeverityPill severity={item.severity} />
        <span className="text-foreground truncate font-mono text-[13px]">
          {item.subject}
        </span>
        <span className="order-4 col-span-3 min-w-0 lg:order-none lg:col-span-1">
          <span className="text-foreground block text-sm font-medium">
            {item.issue}
          </span>
          <span className="text-muted-foreground block text-xs">
            {item.detail}
          </span>
        </span>
        <span className="text-foreground order-3 text-right font-mono text-[13px] tabular-nums lg:order-none">
          {item.impactMessages === null
            ? '—'
            : `${formatCount(item.impactMessages)} msgs`}
        </span>
        <span className="order-5 col-span-3 lg:order-none lg:col-span-1">
          <ActionLastSeen seconds={item.lastSeenAt} />
        </span>
        <ChevronRight
          aria-hidden
          className="text-muted-foreground hidden h-4 w-4 lg:block"
        />
      </Link>
    </li>
  )
}
