import { ISSUE_ROW_GRID } from '@/constants/dashboard'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { IssueImpact } from './IssueImpact'
import { IssueLastSeen } from './IssueLastSeen'
import type { IssueRowProps } from './IssueRowProps'
import { IssueRowTitle } from './IssueRowTitle'
import { IssueSeverityPill } from './IssueSeverityPill'

/**
 * One issue. The title link stretches over the whole row and the action
 * buttons sit above it. On a narrow list it stacks as severity, subject and
 * impact, then the issue, then last seen and actions.
 */
export function IssueRow({
  issue,
  nowMs,
  actions,
  children,
  className,
}: Readonly<IssueRowProps>) {
  return (
    <li
      className={cn('hover:bg-accent/60 relative transition-colors', className)}
    >
      <div
        className={cn(
          'grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 px-4 py-3',
          ISSUE_ROW_GRID,
        )}
      >
        <IssueSeverityPill severity={issue.severity} />
        <span
          className="text-foreground min-w-0 text-[13px] [overflow-wrap:anywhere] @xl:truncate"
          title={issue.subject}
        >
          {issue.subject}
        </span>
        <IssueRowTitle issue={issue} />
        <span className="order-3 text-right text-[13px] tabular-nums @xl:order-none">
          <IssueImpact issue={issue} />
        </span>
        <span className="order-5 col-span-2 @xl:order-none @xl:col-span-1">
          <IssueLastSeen seconds={issue.lastSeenAt} nowMs={nowMs} />
        </span>
        <span className="relative z-10 order-6 col-span-3 flex flex-wrap justify-end gap-2 empty:hidden @xl:order-none @xl:col-span-1 @xl:gap-1 @xl:empty:flex">
          {actions}
        </span>
        <ChevronRight
          aria-hidden
          className="text-muted-foreground hidden h-4 w-4 @4xl:block"
        />
      </div>
      {children}
    </li>
  )
}
