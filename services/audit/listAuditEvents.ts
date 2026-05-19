import { auditLog, getDb } from '@/lib/db'
import { desc } from 'drizzle-orm'

/**
 * Return the most recent audit-log entries, newest first. Used by the
 * admin UI; never expose to non-admin roles.
 */
export async function listAuditEvents(limit = 100) {
  const db = getDb()
  return db.select().from(auditLog).orderBy(desc(auditLog.ts)).limit(limit)
}
