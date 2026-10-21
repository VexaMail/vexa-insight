import type { PublicDomainPendingProps } from '../../types/public-check/PublicDomainPendingProps'
import { PublicDomainHeading } from './PublicDomainHeading'
import { PublicLoadingReport } from './PublicLoadingReport'

export function PublicDomainPending({
  domain,
  pending,
}: Readonly<PublicDomainPendingProps>) {
  return pending ? (
    <PublicLoadingReport domain={domain} />
  ) : (
    <PublicDomainHeading domain={domain} />
  )
}
