import type { EnforcementVerdict } from './EnforcementVerdict'
import type { FailingSource } from './FailingSource'
import type { FailingTrafficKind } from './FailingTrafficKind'

/**
 * What `p=quarantine` or `p=reject` would have done to a domain's mail over
 * the window: every DMARC-failing message would have been quarantined or
 * rejected, split by how that failing traffic is read.
 */
export type EnforcementReadiness = {
  days: number
  reportDays: number
  totalMessages: number
  passingMessages: number
  failingMessages: number
  failingByKind: Record<FailingTrafficKind, number>
  legitimateFailureRate: number
  verdict: EnforcementVerdict
  topFailingSources: FailingSource[]
}
