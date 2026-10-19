import { normalizedEvents } from '@/lib/db'
import { sql } from 'drizzle-orm'

/** DMARC passes when SPF or DKIM passed aligned with the header From. */
export function dmarcPassSql() {
  return sql`(${normalizedEvents.spfAligned} = 1 or ${normalizedEvents.dkimAligned} = 1)`
}
