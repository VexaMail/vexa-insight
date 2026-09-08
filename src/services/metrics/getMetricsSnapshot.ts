import type { MetricsSnapshot } from '@/types/metrics'
import { queryEventsByDisposition } from './queryEventsByDisposition'
import { queryEventsBySpfAuth } from './queryEventsBySpfAuth'
import { queryIngestState } from './queryIngestState'
import { queryTableTotals } from './queryTableTotals'

/** Everything the metrics endpoint reports, read in one pass. */
export function getMetricsSnapshot(): MetricsSnapshot {
  return {
    ...queryTableTotals(),
    eventsBySpfAuth: queryEventsBySpfAuth(),
    eventsByDisposition: queryEventsByDisposition(),
    ...queryIngestState(),
  }
}
