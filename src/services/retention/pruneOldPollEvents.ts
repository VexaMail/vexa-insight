import {
  POLL_EVENT_RETENTION_DAYS,
  RETENTION_DAY_MS,
} from '@/constants/retention'
import { getDb, jobPollEvents } from '@/lib/db'
import { lt } from 'drizzle-orm'

/** Deletes job poll events older than the retention window. */
export function pruneOldPollEvents(now: Date): number {
  const cutoff = new Date(
    now.getTime() - POLL_EVENT_RETENTION_DAYS * RETENTION_DAY_MS,
  )
  return getDb()
    .delete(jobPollEvents)
    .where(lt(jobPollEvents.createdAt, cutoff))
    .run().changes
}
