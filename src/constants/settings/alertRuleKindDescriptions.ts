import type { AlertRule } from '@/types/alerts'
import type { AlertRuleKindDescription } from '@/types/settings'

/** Label, one explanatory line and threshold unit per alert rule kind. */
export const ALERT_RULE_KIND_DESCRIPTIONS: Record<
  AlertRule['kind'],
  AlertRuleKindDescription
> = {
  compliance_drop: {
    label: 'Compliance drop',
    line: 'Fires when a domain’s DMARC pass rate falls by at least the threshold, in percentage points, against the window before it.',
    unit: 'pp',
  },
  compliance_below: {
    label: 'Compliance below',
    line: 'Fires when a domain’s DMARC pass rate over the window is under the threshold.',
    unit: '%',
  },
}
