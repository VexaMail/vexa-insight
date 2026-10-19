import { alertRules, getDb } from '@/lib/db'
import type { AlertRule } from '@/types/alerts'
import { asc } from 'drizzle-orm'

export async function listAlertRules(): Promise<AlertRule[]> {
  return getDb()
    .select({
      id: alertRules.id,
      name: alertRules.name,
      kind: alertRules.kind,
      domainName: alertRules.domainName,
      threshold: alertRules.threshold,
      windowDays: alertRules.windowDays,
      minMessages: alertRules.minMessages,
      enabled: alertRules.enabled,
      lastFiredAt: alertRules.lastFiredAt,
    })
    .from(alertRules)
    .orderBy(asc(alertRules.id))
}
