import type { AlertRule } from '@/types/alerts'
import type { AlertRuleFormState } from '@/types/settings'

/** The edit dialog's fields for a stored alert rule. */
export function toAlertRuleForm(rule: AlertRule): AlertRuleFormState {
  return {
    name: rule.name,
    kind: rule.kind,
    domainName: rule.domainName ?? '',
    threshold: String(rule.threshold),
    windowDays: String(rule.windowDays),
    minMessages: String(rule.minMessages),
    enabled: rule.enabled,
  }
}
