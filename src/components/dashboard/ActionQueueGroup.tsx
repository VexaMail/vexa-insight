import { IssueRow, IssueRowActions, IssueRowHeader } from '@/components/issues'
import { QUEUE_GROUP_LIMIT } from '@/constants/dashboard'
import Link from 'next/link'
import type { ActionQueueGroupProps } from './ActionQueueGroupProps'

/** "New or regressed" or "Long-standing": a count, column labels and rows. */
export function ActionQueueGroup({
  title,
  items,
  nowMs,
  impactLabel,
  emptyText,
}: Readonly<ActionQueueGroupProps>) {
  const shown = items.slice(0, QUEUE_GROUP_LIMIT)
  const hidden = items.length - shown.length
  return (
    <div className="@container pt-3 pb-1">
      <h3 className="text-muted-foreground px-4 pb-2 font-mono text-[11px] tracking-[0.16em] uppercase">
        {title} <span className="text-foreground">{items.length}</span>
      </h3>
      {shown.length === 0 ? (
        <p className="text-muted-foreground px-4 pb-3 text-sm">{emptyText}</p>
      ) : (
        <>
          <IssueRowHeader impactLabel={impactLabel} />
          <ul className="divide-border border-border divide-y border-b">
            {shown.map((item) => (
              <IssueRow
                key={item.id}
                issue={item}
                nowMs={nowMs}
                actions={item.canAct ? <IssueRowActions issue={item} /> : null}
              />
            ))}
          </ul>
          {hidden > 0 ? (
            <p className="text-muted-foreground px-4 pt-2 pb-2 text-xs">
              and {hidden} more;{' '}
              <Link href="/issues" className="text-primary hover:underline">
                see them all on the Issues page
              </Link>
              .
            </p>
          ) : null}
        </>
      )}
    </div>
  )
}
