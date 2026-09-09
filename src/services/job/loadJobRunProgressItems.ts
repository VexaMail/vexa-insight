import { getDb, jobPollEvents } from '@/lib/db'
import type { EmailProgressPayload, ProgressItem } from '@/types/dashboard'
import { asc, eq } from 'drizzle-orm'
import { applyEmailProgressToItem } from './applyEmailProgressToItem'

/** Replays a run's poll events into per-email items, newest first. */
export async function loadJobRunProgressItems(
  jobRunId: number,
): Promise<ProgressItem[]> {
  const db = getDb()
  const dbEvents = await db
    .select({
      id: jobPollEvents.id,
      accountId: jobPollEvents.imapAccountId,
      messageUid: jobPollEvents.messageUid,
      step: jobPollEvents.step,
      error: jobPollEvents.error,
      createdAt: jobPollEvents.createdAt,
      messageLabel: jobPollEvents.messageLabel,
    })
    .from(jobPollEvents)
    .where(eq(jobPollEvents.jobRunId, jobRunId))
    .orderBy(asc(jobPollEvents.id))

  const itemMap = new Map<string, ProgressItem>()
  for (const e of dbEvents) {
    if (!e.accountId || !e.messageUid) continue
    const id = `${String(e.accountId)}:${e.messageUid}`
    const payload = {
      accountId: e.accountId,
      uid: e.messageUid,
      step: e.step as EmailProgressPayload['step'],
      error: e.error ?? undefined,
      emailDate: e.createdAt.toISOString(),
      subject: e.messageLabel ?? undefined,
    }
    itemMap.set(id, applyEmailProgressToItem(itemMap.get(id), payload))
  }

  return Array.from(itemMap.values()).toReversed()
}
