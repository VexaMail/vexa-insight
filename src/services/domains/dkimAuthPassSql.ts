import { normalizedEvents } from '@/lib/db'
import { sql } from 'drizzle-orm'

/** True when any DKIM signature of the event verified, aligned or not. */
export function dkimAuthPassSql() {
  return sql`exists (select 1 from normalized_event_dkim_results d where d.event_id = ${normalizedEvents.id} and d.result = 'pass')`
}
