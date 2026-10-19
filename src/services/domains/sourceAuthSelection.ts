import { normalizedEvents } from '@/lib/db'
import { sql } from 'drizzle-orm'
import { dkimAuthPassSql } from './dkimAuthPassSql'
import { dmarcPassSql } from './dmarcPassSql'
import { sumCountWhen } from './sumCountWhen'

/** The columns of `SourceAuthCounts`, as SQL aggregates over events. */
export function sourceAuthSelection() {
  const dkimPass = dkimAuthPassSql()
  const dmarcPass = dmarcPassSql()
  const spfPass = sql`${normalizedEvents.spfAuthResult} = 'pass'`
  return {
    messages: sql<number>`coalesce(sum(${normalizedEvents.count}), 0)`,
    spfAuthPass: sumCountWhen(spfPass),
    spfAligned: sumCountWhen(sql`${normalizedEvents.spfAligned} = 1`),
    dkimAuthPass: sumCountWhen(dkimPass),
    dkimAligned: sumCountWhen(sql`${normalizedEvents.dkimAligned} = 1`),
    dmarcPass: sumCountWhen(dmarcPass),
    lastSeen: sql<number>`max(${normalizedEvents.reportEndDate})`,
    failSpfAuth: sumCountWhen(sql`not ${dmarcPass} and not ${spfPass}`),
    failSpfUnaligned: sumCountWhen(sql`not ${dmarcPass} and ${spfPass}`),
    failDkimNone: sumCountWhen(sql`not ${dmarcPass} and not ${dkimPass}`),
    failDkimUnaligned: sumCountWhen(sql`not ${dmarcPass} and ${dkimPass}`),
  }
}
