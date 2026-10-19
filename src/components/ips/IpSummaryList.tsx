import { Panel } from '@/components/ui'
import type { IpSummaryListProps } from '@/types/ips'
import Link from 'next/link'

/** A short list panel of the overview with a link to its full tab. */
export function IpSummaryList({
  title,
  icon,
  viewAllHref,
  isEmpty,
  emptyText,
  children,
}: Readonly<IpSummaryListProps>) {
  return (
    <Panel
      title={title}
      icon={icon}
      actions={
        <Link
          href={viewAllHref}
          scroll={false}
          className="text-primary text-xs font-medium hover:underline"
        >
          View all
        </Link>
      }
    >
      {isEmpty ? (
        <p className="text-muted-foreground text-sm">{emptyText}</p>
      ) : (
        <div className="flex flex-col gap-2">{children}</div>
      )}
    </Panel>
  )
}
