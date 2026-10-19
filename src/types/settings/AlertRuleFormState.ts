import type { AlertRule } from '@/types/alerts'

/** Fields of the create/edit alert rule dialog, numbers kept as typed. */
export type AlertRuleFormState = {
  readonly name: string
  readonly kind: AlertRule['kind']
  /** Empty applies the rule to every domain. */
  readonly domainName: string
  readonly threshold: string
  readonly windowDays: string
  readonly minMessages: string
  readonly enabled: boolean
}
