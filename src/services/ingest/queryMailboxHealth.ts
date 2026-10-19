import { getDb, imapAccounts, jobPollEvents } from '@/lib/db'
import type { MailboxHealth } from '@/types/ingest'
import { asc, eq, sql } from 'drizzle-orm'

/**
 * Each configured mailbox with its last clean poll event and its last error,
 * read from the job-run log (poll events are kept for 90 days).
 */
export async function queryMailboxHealth(): Promise<MailboxHealth[]> {
  const rows = await getDb()
    .select({
      id: imapAccounts.id,
      label: imapAccounts.label,
      server: imapAccounts.server,
      lastSuccessAt: sql<
        number | null
      >`max(case when ${jobPollEvents.error} is null then ${jobPollEvents.createdAt} end)`,
      lastErrorAt: sql<
        number | null
      >`max(case when ${jobPollEvents.error} is not null then ${jobPollEvents.createdAt} end)`,
      lastError: sql<
        string | null
      >`(select e.error from job_poll_events e where e.imap_account_id = ${imapAccounts.id} and e.error is not null order by e.created_at desc limit 1)`,
    })
    .from(imapAccounts)
    .leftJoin(jobPollEvents, eq(jobPollEvents.imapAccountId, imapAccounts.id))
    .groupBy(imapAccounts.id)
    .orderBy(asc(imapAccounts.sortOrder), asc(imapAccounts.id))

  return rows.map((row) => ({
    id: row.id,
    name: row.label || row.server || `Mailbox ${String(row.id)}`,
    lastSuccessAt: row.lastSuccessAt
      ? new Date(row.lastSuccessAt * 1000)
      : null,
    lastErrorAt: row.lastErrorAt ? new Date(row.lastErrorAt * 1000) : null,
    lastError: row.lastError,
  }))
}
