import type { PruneTablesResult } from '@/types/retention'
import { pruneExpiredSessions } from './pruneExpiredSessions'
import { pruneOldPollEvents } from './pruneOldPollEvents'

/** Removes expired sessions and poll events past their retention window. */
export function pruneTables(now: Date = new Date()): PruneTablesResult {
  return {
    sessions: pruneExpiredSessions(now),
    pollEvents: pruneOldPollEvents(now),
  }
}
