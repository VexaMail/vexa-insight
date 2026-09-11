import { getDb, rawReports } from '@/lib/db'
import { eq } from 'drizzle-orm'

export function isDemoAlreadySeeded(): boolean {
  const db = getDb()
  const row = db
    .select({ id: rawReports.id })
    .from(rawReports)
    .where(eq(rawReports.isDemo, true))
    .limit(1)
    .get()
  return row !== undefined
}
