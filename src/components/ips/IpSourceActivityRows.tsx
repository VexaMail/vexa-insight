import type { IpSourceActivityRowsProps } from '@/types/ips'
import { formatUtcDateTime } from '@/utils/ips'
import { IpInfoRow } from './IpInfoRow'
import { IpUtcStamp } from './IpUtcStamp'

/** First and last report of the source in the window, in UTC, and volume. */
export function IpSourceActivityRows({
  data,
}: Readonly<IpSourceActivityRowsProps>) {
  return (
    <>
      <IpInfoRow label="First seen">
        {data.firstSeen ? (
          <IpUtcStamp value={formatUtcDateTime(data.firstSeen)} />
        ) : (
          'Unknown'
        )}
      </IpInfoRow>
      <IpInfoRow label="Last seen">
        {data.lastSeen ? (
          <IpUtcStamp value={formatUtcDateTime(data.lastSeen)} />
        ) : (
          'Unknown'
        )}
      </IpInfoRow>
      <IpInfoRow label="Total messages">
        <span className="font-mono tabular-nums">
          {data.totalMessages.toLocaleString('en-US')}
        </span>
      </IpInfoRow>
    </>
  )
}
