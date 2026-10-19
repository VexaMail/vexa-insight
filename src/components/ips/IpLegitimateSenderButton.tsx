import type { IpLegitimateSenderButtonProps } from '@/types/ips'
import { IpLegitimateSenderAction } from './IpLegitimateSenderAction'
import { IpOperatorReviewLink } from './IpOperatorReviewLink'

/**
 * The header shortcut to the Operator review verdict. With one related domain
 * it saves the same `legitimate` verdict for that domain at once; with several
 * it leads to the per-domain review, so there is one mechanism either way.
 */
export function IpLegitimateSenderButton({
  ip,
  domains,
  initialVerdict,
}: Readonly<IpLegitimateSenderButtonProps>) {
  const [only] = domains
  if (domains.length === 1 && only) {
    return (
      <IpLegitimateSenderAction
        ip={ip}
        domain={only}
        initialVerdict={initialVerdict}
      />
    )
  }
  if (domains.length === 0) return null
  return <IpOperatorReviewLink domainCount={domains.length} />
}
