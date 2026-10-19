import type { TimelineEvent } from '@/types/timeline'

export const TIMELINE_EVENT_LABELS: Record<TimelineEvent['kind'], string> = {
  dns_change: 'DNS',
  new_source: 'Source',
  source_review: 'Review',
  issue_action: 'Issue',
}
