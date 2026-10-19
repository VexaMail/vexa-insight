import { normalizedEvents } from '@/lib/db'
import { sql } from 'drizzle-orm'

/**
 * A record that failed DMARC: neither the SPF nor the DKIM policy result is
 * `pass`, the complement of the pass the daily rollup counts.
 */
export const DMARC_FAILING_SQL = sql`not (${normalizedEvents.spfResult} = 'pass' or ${normalizedEvents.dkimResult} = 'pass')`
