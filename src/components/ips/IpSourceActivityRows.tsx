import type { IpSourceActivityRowsProps } from '@/types/ips'
import { formatRelativeDate } from '@/utils/format'
import { IpInfoRow } from './IpInfoRow'

/** First and last report of the source in the window and its volume. */
export function IpSourceActivityRows({
  data,
}: Readonly<IpSourceActivityRowsProps>) {
  return (
    <>
      <IpInfoRow label="First seen">
        {data.firstSeen
          ? formatRelativeDate(data.firstSeen).absolute
          : 'Unknown'}
      </IpInfoRow>
      <IpInfoRow label="Last seen">
        {data.lastSeen ? formatRelativeDate(data.lastSeen).absolute : 'Unknown'}
      </IpInfoRow>
      <IpInfoRow label="Total messages">
        <span className="font-mono tabular-nums">
          {data.totalMessages.toLocaleString()}
        </span>
      </IpInfoRow>
    </>
  )
}
