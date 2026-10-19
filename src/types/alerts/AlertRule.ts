import type { AlertRuleKind } from './AlertRuleKind'

export type AlertRule = {
  readonly id: number
  readonly name: string
  readonly kind: AlertRuleKind
  /** Null applies the rule to every monitored domain. */
  readonly domainName: string | null
  /** Percentage points for a drop, percent for a floor. */
  readonly threshold: number
  readonly windowDays: number
  readonly minMessages: number
  readonly enabled: boolean
  /** Unix seconds. */
  readonly lastFiredAt: number | null
}
