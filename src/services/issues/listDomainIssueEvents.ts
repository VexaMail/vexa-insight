import { getDb, issueEvents } from '@/lib/db'
import type { IssueEvent } from '@/types/issues'
import { desc, like, or } from 'drizzle-orm'

/** Operator actions on every issue about a domain, newest first. */
export async function listDomainIssueEvents(
  domainName: string,
): Promise<IssueEvent[]> {
  return getDb()
    .select({
      id: issueEvents.id,
      issueKey: issueEvents.issueKey,
      action: issueEvents.action,
      snoozedUntil: issueEvents.snoozedUntil,
      note: issueEvents.note,
      actorName: issueEvents.actorName,
      createdAt: issueEvents.createdAt,
    })
    .from(issueEvents)
    .where(
      or(
        like(issueEvents.issueKey, `%:${domainName}`),
        like(issueEvents.issueKey, `%:${domainName}:%`),
      ),
    )
    .orderBy(desc(issueEvents.createdAt))
}
