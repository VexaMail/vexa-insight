import { normalizedEvents } from '@/lib/db'
import { sql } from 'drizzle-orm'
import { sumMessagesWhen } from './sumMessagesWhen'

/** Message sums by SPF/DKIM alignment; every sum is coalesced to 0. */
export const reportAlignmentSelection = {
  totalMessages: sql<number>`cast(coalesce(sum(${normalizedEvents.count}), 0) as integer)`,
  spfAlignedCount: sumMessagesWhen(sql`${normalizedEvents.spfAligned} = 1`),
  dkimAlignedCount: sumMessagesWhen(sql`${normalizedEvents.dkimAligned} = 1`),
  bothAlignedCount: sumMessagesWhen(
    sql`${normalizedEvents.spfAligned} = 1 and ${normalizedEvents.dkimAligned} = 1`,
  ),
  dmarcPassCount: sumMessagesWhen(
    sql`${normalizedEvents.spfAligned} = 1 or ${normalizedEvents.dkimAligned} = 1`,
  ),
}
