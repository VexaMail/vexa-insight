import Link from 'next/link'
import type { IssueRowTitleProps } from './IssueRowTitleProps'
import { IssueStatePill } from './IssueStatePill'

/**
 * The issue title, linking to its evidence and stretched over the whole row,
 * with the one-line explanation and the operator state under it.
 */
export function IssueRowTitle({ issue }: Readonly<IssueRowTitleProps>) {
  return (
    <span className="order-4 col-span-3 min-w-0 @xl:order-none @xl:col-span-1">
      <Link
        href={issue.href}
        className="text-foreground focus-visible:ring-ring block text-sm font-medium after:absolute after:inset-0 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
      >
        {issue.issue}
      </Link>
      <span className="text-muted-foreground block truncate text-xs">
        {issue.detail}
      </span>
      {issue.state === 'active' ? null : (
        <span className="mt-1 block">
          <IssueStatePill issue={issue} />
        </span>
      )}
    </span>
  )
}
