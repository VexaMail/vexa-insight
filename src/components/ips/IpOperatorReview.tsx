import type { OperatorPanelsProps } from '@/types/ips'
import { SourceReviewPanel } from './SourceReviewPanel'

/** The operator review panel, the target of the header's allowlist link. */
export function IpOperatorReview({
  ip,
  domains,
  reviews,
}: Readonly<OperatorPanelsProps>) {
  return (
    <div id="operator-review" className="scroll-mt-24">
      <SourceReviewPanel ip={ip} domains={domains} reviews={reviews} />
    </div>
  )
}
