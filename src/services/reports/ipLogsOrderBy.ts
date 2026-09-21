import { normalizedEvents } from '@/lib/db'
import type { IpLogsSort } from '@/types/ips'
import type { SQL } from 'drizzle-orm'
import { asc, desc } from 'drizzle-orm'

/**
 * Order of the event timeline. Events of one report share a timestamp, so the
 * event id is appended to keep paging deterministic.
 */
export function ipLogsOrderBy(sort: IpLogsSort): SQL[] {
  if (sort === 'oldest') {
    return [asc(normalizedEvents.reportBeginDate), asc(normalizedEvents.id)]
  }

  if (sort === 'volume') {
    return [desc(normalizedEvents.count), desc(normalizedEvents.id)]
  }

  return [desc(normalizedEvents.reportBeginDate), desc(normalizedEvents.id)]
}
