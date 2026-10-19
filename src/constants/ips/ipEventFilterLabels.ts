import type { IpEventFilter } from '@/types/ips'

/** The label of each event filter, as its menu shows it. */
export const IP_EVENT_FILTER_LABELS: Record<IpEventFilter, string> = {
  all: 'All events',
  fail: 'DMARC failures',
  pass: 'DMARC passes',
}
