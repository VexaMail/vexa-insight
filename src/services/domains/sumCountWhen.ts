import { normalizedEvents } from '@/lib/db'
import type { SQL } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

/** `sum(count)` over the events matching `condition`. */
export function sumCountWhen(condition: SQL) {
  return sql<number>`coalesce(sum(case when ${condition} then ${normalizedEvents.count} else 0 end), 0)`
}
