import Link from 'next/link'
import { ChangeListRowBody } from './ChangeListRowBody'
import type { ChangeListRowProps } from './ChangeListRowProps'

/** One change, linking to the page that explains it when there is one. */
export function ChangeListRow({ item, nowMs }: Readonly<ChangeListRowProps>) {
  if (!item.href) {
    return (
      <li>
        <ChangeListRowBody item={item} nowMs={nowMs} />
      </li>
    )
  }
  return (
    <li>
      <Link
        href={item.href}
        className="hover:bg-accent/60 focus-visible:ring-ring block transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
      >
        <ChangeListRowBody item={item} nowMs={nowMs} />
      </Link>
    </li>
  )
}
