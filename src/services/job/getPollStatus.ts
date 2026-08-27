import { getDb, jobPollEvents } from '@/lib/db'
import type {
  EmailProgressPayload,
  PaginatedProgressItems,
  PollStatus,
  ProgressItem,
} from '@/types/dashboard'
import { asc, eq } from 'drizzle-orm'
import { applyEmailProgressToItem } from './applyEmailProgressToItem'
import { getPollStatusFromDb } from './getPollStatusFromDb'

export async function getPollStatus(
  page = 1,
  pageSize = 50,
  jobRunId?: number,
): Promise<PollStatus> {
  const status = jobRunId === undefined ? await getPollStatusFromDb() : null
  const targetJobRunId = jobRunId ?? status?.activeJobRunId

  let total = 0
  let items: ProgressItem[] = []

  if (targetJobRunId) {
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
      .where(eq(jobPollEvents.jobRunId, targetJobRunId))
      .orderBy(asc(jobPollEvents.id))

    const itemMap = new Map<string, ProgressItem>()
    for (const e of dbEvents) {
      if (!e.accountId || !e.messageUid) continue
      const id = `${e.accountId}:${e.messageUid}`
      const current = itemMap.get(id)
      const payload = {
        accountId: e.accountId,
        uid: e.messageUid,
        step: e.step as EmailProgressPayload['step'],
        error: e.error ?? undefined,
        emailDate: e.createdAt.toISOString(),
        subject: e.messageLabel ?? undefined,
      }
      const updated = applyEmailProgressToItem(current, payload)
      itemMap.set(id, updated)
    }

    const allItems = Array.from(itemMap.values())
    const ordered = allItems.toReversed()
    total = ordered.length
    const start = (page - 1) * pageSize
    items = ordered.slice(start, start + pageSize)
  }

  const progressItems: PaginatedProgressItems = {
    items,
    total,
    page,
    pageSize,
  }

  return {
    isRunning: status?.isRunning ?? false,
    lastCheck: status?.lastCheck?.toISOString() ?? null,
    currentProcessed: status?.currentProcessed ?? 0,
    totalEmails: status?.totalEmails ?? 0,
    processingEmails: status?.processingEmails ?? 0,
    etaMs: status?.etaMs ?? 0,
    progressItems,
    activeJobRunId: status?.activeJobRunId ?? null,
    statusText: status?.statusText ?? null,
  }
}
