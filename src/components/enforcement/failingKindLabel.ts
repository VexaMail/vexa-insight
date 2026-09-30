import type { FailingTrafficKind } from '@/types/enforcement'

/** Column labels for each kind of failing traffic. */
export const FAILING_KIND_LABEL: Record<FailingTrafficKind, string> = {
  legitimate: 'Legitimate (would be lost)',
  forwarded: 'Forwarded / lists',
  unknown: 'Unknown (would be stopped)',
}
