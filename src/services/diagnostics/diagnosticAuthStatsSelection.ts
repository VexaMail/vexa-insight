import { normalizedEvents } from '@/lib/db'
import { sql } from 'drizzle-orm'

/** Event-count aggregates over normalized events, one column per counter. */
export const diagnosticAuthStatsSelection = {
  totalEvents: sql<number>`cast(coalesce(sum(${normalizedEvents.count}), 0) as integer)`,
  failedEvents: sql<number>`
    cast(coalesce(sum(case when ${normalizedEvents.disposition} != 'none' then ${normalizedEvents.count} else 0 end), 0) as integer)
  `,
  spf_pass_unaligned: sql<number>`
    cast(coalesce(sum(case when ${normalizedEvents.spfAuthResult} = 'pass' and ${normalizedEvents.spfAligned} = 0 then ${normalizedEvents.count} else 0 end), 0) as integer)
  `,
  dkim_pass_unaligned: sql<number>`
    cast(coalesce(sum(case when ${normalizedEvents.dkimResult} = 'pass' and ${normalizedEvents.dkimAligned} = 0 then ${normalizedEvents.count} else 0 end), 0) as integer)
  `,
  spf_auth_fail: sql<number>`
    cast(coalesce(sum(case when ${normalizedEvents.spfAuthResult} = 'fail' then ${normalizedEvents.count} else 0 end), 0) as integer)
  `,
  spf_permerror: sql<number>`
    cast(coalesce(sum(case when ${normalizedEvents.spfAuthResult} = 'permerror' then ${normalizedEvents.count} else 0 end), 0) as integer)
  `,
  spf_temperror: sql<number>`
    cast(coalesce(sum(case when ${normalizedEvents.spfAuthResult} = 'temperror' then ${normalizedEvents.count} else 0 end), 0) as integer)
  `,
  spf_softfail: sql<number>`
    cast(coalesce(sum(case when ${normalizedEvents.spfAuthResult} = 'softfail' then ${normalizedEvents.count} else 0 end), 0) as integer)
  `,
  dkim_all_fail: sql<number>`
    cast(coalesce(sum(case when ${normalizedEvents.dkimResult} != 'pass' then ${normalizedEvents.count} else 0 end), 0) as integer)
  `,
}
