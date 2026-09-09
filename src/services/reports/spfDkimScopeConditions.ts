import { normalizedEvents } from '@/lib/db'
import { eq, inArray, type SQL } from 'drizzle-orm'

/**
 * Domain scope of the SPF/DKIM breakdown: null when the caller may see
 * nothing (empty allow-list, or a domain outside it), otherwise the domain
 * conditions to apply, possibly none.
 */
export function spfDkimScopeConditions(
  allowedIds: number[] | null,
  domainId: number | undefined,
): SQL[] | null {
  if (allowedIds !== null && allowedIds.length === 0) return null
  if (domainId != null) {
    if (allowedIds !== null && !allowedIds.includes(domainId)) return null
    return [eq(normalizedEvents.domainId, domainId)]
  }
  if (allowedIds !== null) {
    return [inArray(normalizedEvents.domainId, allowedIds)]
  }
  return []
}
