import type { AlertRule } from '@/types/alerts'

/** The rule's condition in one line, e.g. "drops 10 pp over 7 days". */
export function describeAlertRule(rule: AlertRule): string {
  const scope = rule.domainName ?? 'any domain'
  const window = `${String(rule.windowDays)}-day window`
  const floor = `at least ${rule.minMessages.toLocaleString('en-US')} messages`
  return rule.kind === 'compliance_drop'
    ? `${scope}: pass rate drops ${String(rule.threshold)} pp vs the previous ${window}, ${floor}`
    : `${scope}: pass rate below ${String(rule.threshold)}% over a ${window}, ${floor}`
}
