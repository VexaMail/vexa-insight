import { rawReports } from '@/lib/db'
import { sql } from 'drizzle-orm'

/** Report count that survives the one-row-per-event join of the list query. */
export const countDistinctReports = sql<number>`count(distinct ${rawReports.id})`
