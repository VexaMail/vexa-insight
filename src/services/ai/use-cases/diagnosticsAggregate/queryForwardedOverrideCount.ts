import {
  getDb,
  normalizedEventPolicyOverrides,
  normalizedEvents,
} from '@/lib/db'
import type { SQL } from 'drizzle-orm'
import { eq, sql } from 'drizzle-orm'

/** Messages excused by a `forwarded` policy override. */
export async function queryForwardedOverrideCount(
  whereClause: SQL | undefined,
): Promise<number> {
  const [row] = await getDb()
    .select({
      forwardedCount: sql<number>`cast(coalesce(sum(case when ${normalizedEventPolicyOverrides.type} = 'forwarded' then ${normalizedEvents.count} else 0 end), 0) as integer)`,
    })
    .from(normalizedEventPolicyOverrides)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEventPolicyOverrides.eventId, normalizedEvents.id),
    )
    .where(whereClause)

  return row?.forwardedCount ?? 0
}
