import type { TimelineEvent } from '@/types/timeline'
import type { StatusTone } from '@/types/ui'

export const TIMELINE_EVENT_TONES: Record<TimelineEvent['kind'], StatusTone> = {
  dns_change: 'info',
  new_source: 'warning',
  source_review: 'success',
  issue_action: 'neutral',
}
