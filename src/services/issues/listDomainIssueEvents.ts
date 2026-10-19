import { getDb, issueEvents } from '@/lib/db'
import type { IssueEvent } from '@/types/issues'
import { issueKeyDomain } from '@/utils/issues'
import { desc, like } from 'drizzle-orm'

/** Operator actions on every issue about a domain, newest first. */
export async function listDomainIssueEvents(
  domainName: string,
): Promise<IssueEvent[]> {
  const rows = await getDb()
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
    // A coarse prefilter only: `_` and `%` are wildcards in LIKE and a
    // domain can contain `_`, so the domain segment is compared exactly below.
    .where(like(issueEvents.issueKey, `%:%`))
    .orderBy(desc(issueEvents.createdAt))
  return rows.filter((row) => issueKeyDomain(row.issueKey) === domainName)
}
