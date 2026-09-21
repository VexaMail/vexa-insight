import { domains, normalizedEvents, rawReports } from '@/lib/db'
import type { IpLogsQuery } from '@/types/ips'
import type { SQL } from 'drizzle-orm'
import { and, eq, like, or } from 'drizzle-orm'

/** Search and dropdown filters of the IP event timeline. */
export function ipLogsFilterConditions(query: IpLogsQuery): SQL | undefined {
  const search = query.search.trim()

  return and(
    search === ''
      ? undefined
      : or(
          like(domains.name, `%${search}%`),
          like(rawReports.reportId, `%${search}%`),
        ),
    query.disposition === ''
      ? undefined
      : eq(normalizedEvents.disposition, query.disposition),
    query.spfResult === ''
      ? undefined
      : eq(normalizedEvents.spfResult, query.spfResult),
    query.dkimResult === ''
      ? undefined
      : eq(normalizedEvents.dkimResult, query.dkimResult),
  )
}
