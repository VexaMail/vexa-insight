import Link from 'next/link'
import { ChangeListRowBody } from './ChangeListRowBody'
import type { ChangeListRowProps } from './ChangeListRowProps'

/** One change, linking to the page that explains it when there is one. */
export function ChangeListRow({ item }: Readonly<ChangeListRowProps>) {
  if (!item.href) {
    return (
      <li className="flex items-center gap-3 px-4 py-3">
        <ChangeListRowBody item={item} />
      </li>
    )
  }
  return (
    <li>
      <Link
        href={item.href}
        className="hover:bg-accent/60 focus-visible:ring-ring flex items-center gap-3 px-4 py-3 transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
      >
        <ChangeListRowBody item={item} />
      </Link>
    </li>
  )
}
