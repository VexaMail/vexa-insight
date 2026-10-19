import type { IpSeenFactProps } from '@/types/ips'
import { formatRelativeDate } from '@/utils/format'
import { formatUtcDateTime } from '@/utils/ips'
import { CalendarClock } from 'lucide-react'
import { IpFact } from './IpFact'

/** A first or last seen date with its UTC time and how long ago it was. */
export function IpSeenFact({ label, timestamp }: Readonly<IpSeenFactProps>) {
  if (!timestamp) {
    return (
      <IpFact label={label} icon={<CalendarClock />}>
        Unknown
      </IpFact>
    )
  }
  const utc = formatUtcDateTime(timestamp)
  return (
    <IpFact label={label} icon={<CalendarClock />} sub={utc.time}>
      <span title={formatRelativeDate(timestamp).relative}>{utc.date}</span>
    </IpFact>
  )
}
