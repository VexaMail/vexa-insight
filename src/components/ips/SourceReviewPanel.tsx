import { Panel } from '@/components/ui'
import type { SourceReviewPanelProps } from '@/types/ips'
import { UserCheck } from 'lucide-react'
import { SourceReviewRow } from './SourceReviewRow'

/**
 * The operator's verdict on this source, per domain it sends for. It only
 * changes how Vexa classifies and alerts on the source; it never changes DNS
 * or what receivers do with the mail.
 */
export function SourceReviewPanel({
  ip,
  domains,
  reviews,
}: Readonly<SourceReviewPanelProps>) {
  if (domains.length === 0) return null
  return (
    <Panel
      flush
      icon={<UserCheck />}
      title="Operator review"
      description="One verdict per domain, saved for that domain only; the header's Mark legitimate button sets the same verdict. A legitimate sender or forwarder is left out of unauthorized-source alerts; nothing changes in DNS or at the receivers."
    >
      <ul className="divide-border divide-y">
        {domains.slice(0, 10).map((row) => {
          const verdict =
            reviews.find((review) => review.domainName === row.domain)
              ?.verdict ?? null
          return (
            <SourceReviewRow
              // Remount when a refresh brings a verdict saved elsewhere.
              key={`${String(row.domainId)}-${verdict ?? 'none'}`}
              ip={ip}
              domain={row.domain}
              messageCount={row.messageCount}
              initialVerdict={verdict}
            />
          )
        })}
      </ul>
    </Panel>
  )
}
