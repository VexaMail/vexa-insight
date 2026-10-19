import { IpNetworkPanel, SourceReviewPanel } from '@/components/ips'
import { getAllowedDomainNames } from '@/services/auth'
import { listSourceReviews } from '@/services/source-reviews'
import type { OperatorPanelsProps } from './OperatorPanelsProps'

/** The operator's verdicts on this source and its live network lookup. */
export async function OperatorPanels({
  ip,
  domains,
}: Readonly<OperatorPanelsProps>) {
  const [allowed, reviews] = await Promise.all([
    getAllowedDomainNames(),
    listSourceReviews({ ip }),
  ])
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SourceReviewPanel
        ip={ip}
        domains={domains}
        reviews={reviews.filter(
          (review) => allowed === null || allowed.has(review.domainName),
        )}
      />
      <IpNetworkPanel ip={ip} />
    </div>
  )
}
