import type { SenderIdentity } from '@/types/senders'
import type { FailingTrafficKind } from './FailingTrafficKind'

/** A source with DMARC-failing mail and how its failures are read. */
export type FailingSource = {
  sourceIp: string
  hostname: string | null
  sender: SenderIdentity | null
  kind: FailingTrafficKind
  failingMessages: number
  passRate: number
}
