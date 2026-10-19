import type { FailingTrafficKind } from '@/types/enforcement'

/** Classification label of a source no sender identity matched. */
export const SOURCE_KIND_LABELS: Record<FailingTrafficKind, string> = {
  legitimate: 'Legitimate sender',
  forwarded: 'Forwarder / list',
  unknown: 'Unknown sender',
}
