import { alertRules, getDb } from '@/lib/db'
import type { AlertRuleInput } from '@/validators/alerts'

/** Stores a new rule and returns its id. */
export async function createAlertRule(
  input: AlertRuleInput,
  nowMs = Date.now(),
): Promise<number> {
  const now = Math.floor(nowMs / 1000)
  const [row] = await getDb()
    .insert(alertRules)
    .values({ ...input, createdAt: now, updatedAt: now })
    .returning({ id: alertRules.id })
  if (!row) throw new Error('alert rule insert returned no row')
  return row.id
}
