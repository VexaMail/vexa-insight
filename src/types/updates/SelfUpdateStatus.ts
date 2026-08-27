import type { SelfUpdateCapability } from './SelfUpdateCapability'
import type { SelfUpdateLogTail } from './SelfUpdateLogTail'

export type SelfUpdateStatus = {
  readonly capability: SelfUpdateCapability
  readonly log: SelfUpdateLogTail
}
