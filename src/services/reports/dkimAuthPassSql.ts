import { normalizedEventDkimResults, normalizedEvents } from '@/lib/db'
import { sql } from 'drizzle-orm'

/** True when at least one DKIM signature of the event verified. */
export const dkimAuthPassSql = sql`exists (select 1 from ${normalizedEventDkimResults} where ${normalizedEventDkimResults.eventId} = ${normalizedEvents.id} and ${normalizedEventDkimResults.result} = 'pass')`
