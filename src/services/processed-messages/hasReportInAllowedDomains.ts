import { getDb, rawReports } from '@/lib/db'
import type { Column, SQL } from 'drizzle-orm'
import { and, eq, exists, sql } from 'drizzle-orm'
import { hasEventInAllowedDomains } from './hasEventInAllowedDomains'

/**
 * SQL predicate that holds when the message referenced by `messageId` produced
 * a raw report with at least one normalized event in one of `allowedIds`.
 * A message that produced no report at all is hidden from a restricted
 * caller, since there is nothing they would be allowed to see for it.
 */
export function hasReportInAllowedDomains(
  messageId: Column,
  allowedIds: number[],
): SQL {
  const db = getDb()
  return exists(
    db
      .select({ one: sql`1` })
      .from(rawReports)
      .where(
        and(
          eq(rawReports.sourceMessageId, messageId),
          hasEventInAllowedDomains(rawReports.id, allowedIds),
        ),
      ),
  )
}
