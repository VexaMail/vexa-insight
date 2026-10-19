import { getDb, issueEvents } from '@/lib/db'
import type { RecordIssueEventInput } from '@/types/issues'

/** Appends one operator action to an issue's history. */
export async function recordIssueEvent(
  input: RecordIssueEventInput,
  nowMs = Date.now(),
): Promise<void> {
  await getDb()
    .insert(issueEvents)
    .values({
      issueKey: input.issueKey,
      action: input.action,
      snoozedUntil:
        input.action === 'snooze' ? (input.snoozedUntil ?? null) : null,
      note: input.note ?? null,
      actorId: input.actor?.id ?? null,
      actorName: input.actor?.name ?? null,
      createdAt: Math.floor(nowMs / 1000),
    })
}
