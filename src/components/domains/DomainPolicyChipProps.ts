import type { PublishedDmarcPolicy } from '@/types/domains'

export type DomainPolicyChipProps = {
  readonly policy: PublishedDmarcPolicy | null
  /** Add what the policy does ("monitoring only") after the tag. */
  readonly withMode?: boolean
}
