import Link from 'next/link'
import type { ActionQueueMoreNoteProps } from './ActionQueueMoreNoteProps'

/**
 * "and N more" under a queue group, from `sm`; a phone has its own
 * "View all issues" button at the foot of the panel instead.
 */
export function ActionQueueMoreNote({
  hidden,
}: Readonly<ActionQueueMoreNoteProps>) {
  if (hidden <= 0) return null
  return (
    <p className="text-muted-foreground px-4 pt-2 pb-2 text-xs max-sm:hidden">
      and {hidden} more;{' '}
      <Link href="/issues" className="text-primary hover:underline">
        see them all on the Issues page
      </Link>
      .
    </p>
  )
}
