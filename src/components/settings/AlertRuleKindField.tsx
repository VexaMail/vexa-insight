import { ALERT_RULE_KIND_DESCRIPTIONS } from '@/constants/settings'
import type { AlertRuleFieldsProps } from './AlertRuleFieldsProps'

/** The rule kind as two radio cards, each with what it watches. */
export function AlertRuleKindField({
  form,
  setForm,
}: Readonly<AlertRuleFieldsProps>) {
  return (
    <fieldset>
      <legend className="text-foreground mb-1.5 text-sm font-medium">
        Kind
      </legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {(['compliance_drop', 'compliance_below'] as const).map((kind) => (
          <label
            key={kind}
            htmlFor={`alert-rule-kind-${kind}`}
            className="border-border hover:bg-accent/50 has-[:checked]:border-primary/50 has-[:checked]:bg-primary/5 grid cursor-pointer grid-cols-[auto_minmax(0,1fr)] gap-x-2.5 rounded-md border p-3 transition-colors duration-150"
          >
            <input
              id={`alert-rule-kind-${kind}`}
              type="radio"
              name="alert-rule-kind"
              checked={form.kind === kind}
              onChange={() => {
                setForm((prev) => ({ ...prev, kind }))
              }}
              className="accent-primary row-span-2 mt-0.5 h-4 w-4"
            />
            <span className="text-foreground text-sm font-medium">
              {ALERT_RULE_KIND_DESCRIPTIONS[kind].label}
            </span>
            <span className="text-muted-foreground text-xs">
              {ALERT_RULE_KIND_DESCRIPTIONS[kind].line}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
