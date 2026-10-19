import { ALERT_RULE_KIND_DESCRIPTIONS } from '@/constants/settings'
import type { AlertRuleFieldsProps } from './AlertRuleFieldsProps'
import { AlertRuleNumberField } from './AlertRuleNumberField'

/** Threshold, window and minimum volume of an alert rule. */
export function AlertRuleNumberFields({
  form,
  setForm,
}: Readonly<AlertRuleFieldsProps>) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <AlertRuleNumberField
        id="alert-rule-threshold"
        label="Threshold"
        unit={ALERT_RULE_KIND_DESCRIPTIONS[form.kind].unit}
        value={form.threshold}
        step="0.1"
        onChange={(threshold) => {
          setForm((prev) => ({ ...prev, threshold }))
        }}
      />
      <AlertRuleNumberField
        id="alert-rule-window"
        label="Window"
        unit="days"
        value={form.windowDays}
        step="1"
        onChange={(windowDays) => {
          setForm((prev) => ({ ...prev, windowDays }))
        }}
      />
      <AlertRuleNumberField
        id="alert-rule-min-messages"
        label="Min. messages"
        unit="msgs"
        value={form.minMessages}
        step="1"
        onChange={(minMessages) => {
          setForm((prev) => ({ ...prev, minMessages }))
        }}
      />
    </div>
  )
}
