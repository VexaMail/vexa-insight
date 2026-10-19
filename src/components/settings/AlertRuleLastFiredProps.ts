export type AlertRuleLastFiredProps = {
  /** Unix seconds, or null when the rule never fired. */
  readonly lastFiredAt: number | null
}
