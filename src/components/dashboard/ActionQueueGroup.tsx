import { IssueRow, IssueRowActions, IssueRowHeader } from '@/components/issues'
import { QUEUE_GROUP_LIMIT } from '@/constants/dashboard'
import { cn } from '@/lib/utils'
import type { ActionQueueGroupProps } from './ActionQueueGroupProps'
import { ActionQueueMoreNote } from './ActionQueueMoreNote'

/**
 * "New or regressed" or "Long-standing": a count, column labels and rows. A
 * phone shows only the first `phoneLimit` rows and leaves the rest, with the
 * "and N more" note, to the panel's "View all issues".
 */
export function ActionQueueGroup({
  title,
  items,
  nowMs,
  impactLabel,
  emptyText,
  phoneLimit,
}: Readonly<ActionQueueGroupProps>) {
  const shown = items.slice(0, QUEUE_GROUP_LIMIT)
  return (
    <div
      className={cn(
        '@container pt-3 pb-1',
        phoneLimit === 0 && items.length > 0 ? 'max-sm:hidden' : '',
      )}
    >
      <h3 className="text-muted-foreground px-4 pb-2 font-mono text-[11px] tracking-[0.16em] uppercase">
        {title} <span className="text-foreground">{items.length}</span>
      </h3>
      {shown.length === 0 ? (
        <p className="text-muted-foreground px-4 pb-3 text-sm">{emptyText}</p>
      ) : (
        <>
          <IssueRowHeader impactLabel={impactLabel} />
          <ul
            className={cn(
              'divide-border border-border divide-y border-b',
              shown.length > phoneLimit ? 'max-sm:border-b-0' : '',
            )}
          >
            {shown.map((item, index) => (
              <IssueRow
                key={item.id}
                issue={item}
                nowMs={nowMs}
                className={index < phoneLimit ? '' : 'max-sm:hidden'}
                actions={item.canAct ? <IssueRowActions issue={item} /> : null}
              />
            ))}
          </ul>
          <ActionQueueMoreNote hidden={items.length - shown.length} />
        </>
      )}
    </div>
  )
}
