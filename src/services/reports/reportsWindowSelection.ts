import { normalizedEvents, rawReports } from '@/lib/db'
import { sql } from 'drizzle-orm'

/** Columns of the reports-window totals; every sum is coalesced to 0. */
export const reportsWindowSelection = {
  reports: sql<number>`cast(count(distinct ${rawReports.id}) as integer)`,
  reporters: sql<number>`cast(count(distinct ${rawReports.orgName}) as integer)`,
  domains: sql<number>`cast(count(distinct ${normalizedEvents.domainId}) as integer)`,
  messages: sql<number>`cast(coalesce(sum(${normalizedEvents.count}), 0) as integer)`,
  failingMessages: sql<number>`
    cast(coalesce(sum(case when ${normalizedEvents.spfAligned} = 0 and ${normalizedEvents.dkimAligned} = 0 then ${normalizedEvents.count} else 0 end), 0) as integer)
  `,
}
