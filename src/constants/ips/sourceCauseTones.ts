import type { SourceCause } from '@/types/ips'
import type { StatusTone } from '@/types/ui'

export const SOURCE_CAUSE_TONES: Record<SourceCause, StatusTone> = {
  'dmarc-pass': 'success',
  forwarding: 'info',
  'spf-unaligned': 'info',
  failing: 'danger',
  unknown: 'unknown',
}
