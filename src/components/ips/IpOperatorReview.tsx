import { OPERATOR_REVIEW_ANCHOR_ID } from '@/constants/ips'
import type { OperatorPanelsProps } from '@/types/ips'
import { SourceReviewPanel } from './SourceReviewPanel'

/** The operator review panel, the target of the header's allowlist link. */
export function IpOperatorReview({
  ip,
  domains,
  reviews,
}: Readonly<OperatorPanelsProps>) {
  return (
    <div
      id={OPERATOR_REVIEW_ANCHOR_ID}
      tabIndex={-1}
      className="target:ring-success/60 focus-visible:ring-ring scroll-mt-24 rounded-xl transition-shadow duration-150 outline-none target:ring-2 focus-visible:ring-2"
    >
      <SourceReviewPanel ip={ip} domains={domains} reviews={reviews} />
    </div>
  )
}
