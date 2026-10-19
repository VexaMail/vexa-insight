import type { IpSourceActivityRowsProps } from '@/types/ips'
import { formatPercentShare } from '@/utils/ips'
import { Ban, Inbox, TriangleAlert } from 'lucide-react'
import { IpFact } from './IpFact'

/** What receivers did with the mail: delivered, quarantined, rejected. */
export function IpDispositionFacts({
  data,
}: Readonly<IpSourceActivityRowsProps>) {
  const total = data.totalMessages
  return (
    <>
      <IpFact
        label="Disposition: none"
        icon={<Inbox />}
        tone="neutral"
        sub={formatPercentShare(data.dispositionNone, total)}
      >
        <span className="font-mono tabular-nums">
          {data.dispositionNone.toLocaleString()}
        </span>
      </IpFact>
      <IpFact
        label="Quarantine"
        icon={<TriangleAlert />}
        tone="warning"
        sub={formatPercentShare(data.dispositionQuarantine, total)}
      >
        <span className="font-mono tabular-nums">
          {data.dispositionQuarantine.toLocaleString()}
        </span>
      </IpFact>
      <IpFact
        label="Reject"
        icon={<Ban />}
        tone="danger"
        sub={formatPercentShare(data.dispositionReject, total)}
      >
        <span className="font-mono tabular-nums">
          {data.dispositionReject.toLocaleString()}
        </span>
      </IpFact>
    </>
  )
}
