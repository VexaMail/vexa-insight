import { IP_EVENT_FILTER_LABELS } from '@/constants/ips'
import type { IpDetailContextProps } from '@/types/ips'
import Link from 'next/link'
import { IpMenu } from './IpMenu'

/** The event filter menu and the link to the full timeline. */
export function IpTimelineActions({ ctx }: Readonly<IpDetailContextProps>) {
  return (
    <>
      <IpMenu
        label={IP_EVENT_FILTER_LABELS[ctx.eventFilter]}
        trigger="filter"
        items={ctx.eventFilterLinks}
      />
      <Link
        href={ctx.tabs.timeline.href}
        scroll={false}
        className="text-primary text-xs font-medium hover:underline"
      >
        View all
      </Link>
    </>
  )
}
