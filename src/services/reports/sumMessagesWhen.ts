import { normalizedEvents } from '@/lib/db'
import type { SQL } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

/** Sum of the event message counts matching `condition`, coalesced to 0. */
export function sumMessagesWhen(condition: SQL): SQL<number> {
  return sql<number>`cast(coalesce(sum(case when ${condition} then ${normalizedEvents.count} else 0 end), 0) as integer)`
}
