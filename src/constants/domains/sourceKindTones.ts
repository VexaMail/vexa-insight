import type { FailingTrafficKind } from '@/types/enforcement'
import type { StatusTone } from '@/types/ui'

/** Dot tone of each source classification. */
export const SOURCE_KIND_TONES: Record<FailingTrafficKind, StatusTone> = {
  legitimate: 'success',
  forwarded: 'info',
  unknown: 'warning',
}
