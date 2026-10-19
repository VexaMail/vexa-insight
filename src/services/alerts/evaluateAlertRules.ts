import { alertRules, getDb } from '@/lib/db'
import { fireAndForgetDispatch } from '@/services/notifications'
import { matchAlertRule } from '@/utils/alerts'
import { DAY_SECONDS } from '@/utils/dates'
import { eq } from 'drizzle-orm'
import { getDomainComplianceTotals } from './getDomainComplianceTotals'
import { listAlertRules } from './listAlertRules'

/**
 * Checks every enabled rule that has not fired within its own window and
 * dispatches `auth.fail_rate_spike` with the matching domains. Returns the ids
 * of the rules that fired.
 */
export async function evaluateAlertRules(
  nowMs = Date.now(),
): Promise<number[]> {
  const now = Math.floor(nowMs / 1000)
  const fired: number[] = []
  for (const rule of await listAlertRules()) {
    const window = rule.windowDays * DAY_SECONDS
    if (!rule.enabled) continue
    if (rule.lastFiredAt !== null && now - rule.lastFiredAt < window) continue
    const matches = matchAlertRule(
      rule,
      await getDomainComplianceTotals(now - window, now),
      await getDomainComplianceTotals(now - 2 * window, now - window),
    )
    if (matches.length === 0) continue
    fireAndForgetDispatch('auth.fail_rate_spike', {
      rule: {
        id: rule.id,
        name: rule.name,
        kind: rule.kind,
        threshold: rule.threshold,
        windowDays: rule.windowDays,
      },
      domains: matches,
    })
    await getDb()
      .update(alertRules)
      .set({ lastFiredAt: now })
      .where(eq(alertRules.id, rule.id))
    fired.push(rule.id)
  }
  return fired
}
