import { normalizedEvents } from '@/lib/db'
import { sql } from 'drizzle-orm'
import { dkimAuthPassSql } from '../reports/dkimAuthPassSql'

/** Projection of the per-day query of one source, same pass rules as its totals. */
export const ipDailyTrendSelection = {
  day: sql<number>`cast(${normalizedEvents.reportEndDate} / 86400 as integer)`.as(
    'day',
  ),
  total: sql<number>`sum(${normalizedEvents.count})`.as('total'),
  spfAuthPass:
    sql<number>`coalesce(sum(case when ${normalizedEvents.spfAuthResult} = 'pass' then ${normalizedEvents.count} else 0 end), 0)`.as(
      'spf_auth_pass',
    ),
  dkimAuthPass:
    sql<number>`coalesce(sum(case when ${dkimAuthPassSql} then ${normalizedEvents.count} else 0 end), 0)`.as(
      'dkim_auth_pass',
    ),
  dmarcPass:
    sql<number>`coalesce(sum(case when ${normalizedEvents.spfAligned} = 1 or ${normalizedEvents.dkimAligned} = 1 then ${normalizedEvents.count} else 0 end), 0)`.as(
      'dmarc_pass',
    ),
}
