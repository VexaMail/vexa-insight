import { getDb, sndsIpData } from '@/lib/db'
import type { SndsDataRow } from '@/types/snds'
import { sql } from 'drizzle-orm'

/** Stores one day's SNDS rows, replacing any row for the same date and IP. */
export function upsertSndsDataRows(
  reportDate: string,
  rows: readonly SndsDataRow[],
  fetchedAt: Date,
): number {
  if (rows.length === 0) return 0
  getDb()
    .insert(sndsIpData)
    .values(rows.map((row) => ({ ...row, reportDate, fetchedAt })))
    .onConflictDoUpdate({
      target: [sndsIpData.reportDate, sndsIpData.ip],
      set: {
        activityStart: sql`excluded.activity_start`,
        activityEnd: sql`excluded.activity_end`,
        rcptCommands: sql`excluded.rcpt_commands`,
        dataCommands: sql`excluded.data_commands`,
        messageRecipients: sql`excluded.message_recipients`,
        filterResult: sql`excluded.filter_result`,
        complaintRate: sql`excluded.complaint_rate`,
        trapPeriodStart: sql`excluded.trap_period_start`,
        trapPeriodEnd: sql`excluded.trap_period_end`,
        trapHits: sql`excluded.trap_hits`,
        sampleHelo: sql`excluded.sample_helo`,
        sampleMailFrom: sql`excluded.sample_mail_from`,
        comments: sql`excluded.comments`,
        raw: sql`excluded.raw`,
        fetchedAt: sql`excluded.fetched_at`,
      },
    })
    .run()
  return rows.length
}
