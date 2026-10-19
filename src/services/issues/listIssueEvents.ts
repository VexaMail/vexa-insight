import { getDb, issueEvents } from '@/lib/db'
import type { IssueEvent } from '@/types/issues'
import { asc, inArray } from 'drizzle-orm'

/** The events of the given issues, oldest first. */
export async function listIssueEvents(
  issueKeys: readonly string[],
): Promise<IssueEvent[]> {
  if (issueKeys.length === 0) return []
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
    .where(inArray(issueEvents.issueKey, [...issueKeys]))
    .orderBy(asc(issueEvents.createdAt), asc(issueEvents.id))
}
