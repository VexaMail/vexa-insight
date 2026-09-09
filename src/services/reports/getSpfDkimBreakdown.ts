import { getDb, normalizedEvents } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { SpfDkimBreakdown } from '@/types/reports'
import { and, sql } from 'drizzle-orm'
import { emptySpfDkimBreakdown } from './emptySpfDkimBreakdown'
import { getDateRangeConditions } from './formatters/dateRangeConditions'
import { rowToSpfDkimBreakdown } from './rowToSpfDkimBreakdown'
import { spfDkimScopeConditions } from './spfDkimScopeConditions'

/**
 * Returns SPF/DKIM pass/fail counts. Optionally for a single domain.
 */
export async function getSpfDkimBreakdown(
  domainId?: number,
  from?: Date,
  to?: Date,
): Promise<SpfDkimBreakdown> {
  const db = getDb()
  const base = db
    .select({
      spfPass: sql<number>`sum(case when ${normalizedEvents.spfResult} = 'pass' then ${normalizedEvents.count} else 0 end)`,
      spfFail: sql<number>`sum(case when ${normalizedEvents.spfResult} != 'pass' then ${normalizedEvents.count} else 0 end)`,
      dkimPass: sql<number>`sum(case when ${normalizedEvents.dkimResult} = 'pass' then ${normalizedEvents.count} else 0 end)`,
      dkimFail: sql<number>`sum(case when ${normalizedEvents.dkimResult} != 'pass' then ${normalizedEvents.count} else 0 end)`,
    })
    .from(normalizedEvents)
  const allowedIds = await getAllowedDomainIds()

  const scope = spfDkimScopeConditions(allowedIds, domainId)
  if (scope === null) return emptySpfDkimBreakdown()

  const conditions = [...scope, ...getDateRangeConditions(from, to)]
  if (conditions.length > 0) {
    base.where(and(...conditions))
  }

  const [row] = await base
  return rowToSpfDkimBreakdown(row)
}
