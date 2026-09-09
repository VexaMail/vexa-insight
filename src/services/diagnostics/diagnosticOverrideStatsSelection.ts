import { normalizedEventPolicyOverrides, normalizedEvents } from '@/lib/db'
import { sql } from 'drizzle-orm'

/** Event counts per DMARC policy override reason. */
export const diagnosticOverrideStatsSelection = {
  dmarc_override_forwarded: sql<number>`
    cast(coalesce(sum(case when ${normalizedEventPolicyOverrides.type} = 'forwarded' then ${normalizedEvents.count} else 0 end), 0) as integer)
  `,
  dmarc_override_local_policy: sql<number>`
    cast(coalesce(sum(case when ${normalizedEventPolicyOverrides.type} = 'local_policy' then ${normalizedEvents.count} else 0 end), 0) as integer)
  `,
}
