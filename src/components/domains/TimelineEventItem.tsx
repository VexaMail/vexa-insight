import { StatusPill } from '@/components/ui'
import {
  TIMELINE_EVENT_ICONS,
  TIMELINE_EVENT_LABELS,
  TIMELINE_EVENT_TONES,
} from '@/constants/domains'
import type { TimelineEventItemProps } from '@/types/domains'
import { formatUnixDateTime } from '@/utils/domains'
import Link from 'next/link'

/** One entry of the domain's "What changed" list. */
export function TimelineEventItem({ event }: Readonly<TimelineEventItemProps>) {
  const Icon = TIMELINE_EVENT_ICONS[event.kind]
  return (
    <li className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-start sm:gap-3">
      <span className="text-muted-foreground w-40 shrink-0 font-mono text-xs">
        {formatUnixDateTime(event.at)}
      </span>
      <StatusPill
        tone={TIMELINE_EVENT_TONES[event.kind]}
        icon={<Icon />}
        className="w-fit sm:w-20"
      >
        {TIMELINE_EVENT_LABELS[event.kind]}
      </StatusPill>
      <div className="min-w-0 flex-1">
        <p className="text-foreground text-sm font-medium">
          {event.href ? (
            <Link href={event.href} className="hover:underline">
              {event.title}
            </Link>
          ) : (
            event.title
          )}
        </p>
        {event.detail ? (
          <p className="text-muted-foreground font-mono text-xs break-all">
            {event.detail}
          </p>
        ) : null}
      </div>
    </li>
  )
}
