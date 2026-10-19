import type { IpRelatedDomainRow } from '@/types/IpRelatedDomainRow'
import type { SourceReview } from '@/types/source-reviews'

export type OperatorPanelsProps = {
  readonly ip: string
  readonly domains: readonly IpRelatedDomainRow[]
  readonly reviews: readonly SourceReview[]
}
