import { QUEUE_GROUP_LIMIT } from '@/constants/dashboard'
import type { ActionQueueGroupProps } from './ActionQueueGroupProps'
import { ActionQueueHeader } from './ActionQueueHeader'
import { ActionQueueRow } from './ActionQueueRow'

/** "New or regressed" or "Long-standing": a count, column labels and rows. */
export function ActionQueueGroup({
  title,
  items,
  emptyText,
}: Readonly<ActionQueueGroupProps>) {
  const shown = items.slice(0, QUEUE_GROUP_LIMIT)
  const hidden = items.length - shown.length
  return (
    <div className="py-3">
      <h3 className="text-muted-foreground px-4 pb-2 font-mono text-[11px] tracking-[0.16em] uppercase">
        {title} <span className="text-foreground">{items.length}</span>
      </h3>
      {shown.length === 0 ? (
        <p className="text-muted-foreground px-4 text-sm">{emptyText}</p>
      ) : (
        <>
          <ActionQueueHeader />
          <ul className="divide-border border-border divide-y border-y">
            {shown.map((item) => (
              <ActionQueueRow key={item.id} item={item} />
            ))}
          </ul>
          {hidden > 0 ? (
            <p className="text-muted-foreground px-4 pt-2 text-xs">
              and {hidden} more of the same kinds; open Domains or Sending
              sources to see them all.
            </p>
          ) : null}
        </>
      )}
    </div>
  )
}
