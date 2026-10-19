import type { FailingTrafficKind } from '@/types/enforcement'
import type { StatusTone } from '@/types/ui'

/** Pill tone of each reading of failing traffic. */
export const FAILING_KIND_TONE: Record<FailingTrafficKind, StatusTone> = {
  legitimate: 'danger',
  forwarded: 'info',
  unknown: 'neutral',
}
