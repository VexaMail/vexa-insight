import { normalizedEventDkimResults, normalizedEvents } from '@/lib/db'
import type { SQL } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

/** The DKIM signing domains of the event whose result matches `pass`. */
export function dkimDomainsSql(pass: boolean): SQL<string | null> {
  const op = pass ? sql`=` : sql`<>`
  return sql<
    string | null
  >`(select group_concat(distinct ${normalizedEventDkimResults.domain}) from ${normalizedEventDkimResults} where ${normalizedEventDkimResults.eventId} = ${normalizedEvents.id} and ${normalizedEventDkimResults.result} ${op} 'pass')`
}
