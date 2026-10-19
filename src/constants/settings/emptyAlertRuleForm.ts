import type { AlertRuleFormState } from '@/types/settings'

/** A new rule with the API's defaults: 7-day window, 100 messages. */
export const EMPTY_ALERT_RULE_FORM: AlertRuleFormState = {
  name: '',
  kind: 'compliance_drop',
  domainName: '',
  threshold: '10',
  windowDays: '7',
  minMessages: '100',
  enabled: true,
}
