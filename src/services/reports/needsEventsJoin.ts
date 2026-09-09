import type { LatestReportsFilter } from '@/types/reports'

/**
 * Every filter but `org` reads a column of normalizedEvents, so the join is
 * needed exactly when one of them is present.
 */
export function needsEventsJoin(filter: LatestReportsFilter): boolean {
  return (
    filter.allowedIds !== null ||
    filter.domainId !== undefined ||
    !!filter.from ||
    !!filter.to
  )
}
