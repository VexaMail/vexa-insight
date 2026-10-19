import type { SQL, SQLWrapper } from 'drizzle-orm'
import { inArray, sql } from 'drizzle-orm'

/**
 * Restricts a query to the domains the caller may see: no condition for an
 * unrestricted user, an always-false one for a user with no domains.
 */
export function domainScope(
  column: SQLWrapper,
  allowedIds: number[] | null,
): SQL | undefined {
  if (allowedIds === null) return undefined
  if (allowedIds.length === 0) return sql`0`
  return inArray(column as never, allowedIds)
}
