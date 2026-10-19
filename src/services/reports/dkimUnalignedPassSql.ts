import { normalizedEventDkimResults, normalizedEvents } from '@/lib/db'
import { sql } from 'drizzle-orm'

/**
 * True when a DKIM signature of the event verified for a domain that is not
 * aligned with the From domain: valid signature, wrong signer.
 */
export const dkimUnalignedPassSql = sql`exists (select 1 from ${normalizedEventDkimResults} where ${normalizedEventDkimResults.eventId} = ${normalizedEvents.id} and ${normalizedEventDkimResults.result} = 'pass' and ${normalizedEventDkimResults.isAligned} = 0)`
