import { alertRules, getDb } from '@/lib/db'
import type { AlertRuleUpdate } from '@/validators/alerts'
import { eq } from 'drizzle-orm'

/** Applies a partial change; false when no rule has that id. */
export async function updateAlertRule(
  id: number,
  patch: AlertRuleUpdate,
  nowMs = Date.now(),
): Promise<boolean> {
  const rows = await getDb()
    .update(alertRules)
    .set({ ...patch, updatedAt: Math.floor(nowMs / 1000) })
    .where(eq(alertRules.id, id))
    .returning({ id: alertRules.id })
  return rows.length > 0
}
