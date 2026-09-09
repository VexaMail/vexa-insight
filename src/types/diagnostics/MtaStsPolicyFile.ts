import type { MtaStsPolicyFields } from './MtaStsPolicyFields'

/**
 * Outcome of fetching `https://mta-sts.<domain>/.well-known/mta-sts.txt`.
 */
export type MtaStsPolicyFile = MtaStsPolicyFields & {
  policyFileAccessible: boolean
}
