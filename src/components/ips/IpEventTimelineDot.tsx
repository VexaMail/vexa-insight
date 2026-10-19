import { STATUS_TONE_DOT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { IpEventTimelineDotProps } from '@/types/ips'

/** Marker on the timeline rail, coloured by the event's DMARC result. */
export function IpEventTimelineDot({
  tone,
}: Readonly<IpEventTimelineDotProps>) {
  return (
    <span
      aria-hidden
      className="bg-background ring-border absolute top-1 -left-[7px] flex h-3.5 w-3.5 items-center justify-center rounded-full ring-1"
    >
      <span
        className={cn('h-2 w-2 rounded-full', STATUS_TONE_DOT_CLASSES[tone])}
      />
    </span>
  )
}
