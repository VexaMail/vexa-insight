import { alertRules, getDb } from '@/lib/db'
import { eq } from 'drizzle-orm'

/** False when no rule has that id. */
export async function deleteAlertRule(id: number): Promise<boolean> {
  const rows = await getDb()
    .delete(alertRules)
    .where(eq(alertRules.id, id))
    .returning({ id: alertRules.id })
  return rows.length > 0
}
