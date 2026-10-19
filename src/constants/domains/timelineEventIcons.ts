import type { TimelineEvent } from '@/types/timeline'
import type { LucideIcon } from 'lucide-react'
import { CircleAlert, Network, Server, UserCheck } from 'lucide-react'

/** Icon of each kind of entry on the domain's "What changed" list. */
export const TIMELINE_EVENT_ICONS: Record<TimelineEvent['kind'], LucideIcon> = {
  dns_change: Network,
  new_source: Server,
  source_review: UserCheck,
  issue_action: CircleAlert,
}
