import { Input } from '@/components/ui'
import {
  SETTINGS_INPUT_CLASS_NAME,
  SETTINGS_LABEL_CLASS_NAME,
} from '@/constants/settings'
import type { AlertRuleNumberFieldProps } from './AlertRuleNumberFieldProps'

/** A numeric rule field with its unit inside the right edge. */
export function AlertRuleNumberField({
  id,
  label,
  unit,
  value,
  step,
  onChange,
}: Readonly<AlertRuleNumberFieldProps>) {
  return (
    <div>
      <label htmlFor={id} className={SETTINGS_LABEL_CLASS_NAME}>
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step={step}
          required
          value={value}
          className={`${SETTINGS_INPUT_CLASS_NAME} pr-14 font-mono tabular-nums`}
          onChange={(e) => {
            onChange(e.target.value)
          }}
        />
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 right-3 flex items-center font-mono text-xs">
          {unit}
        </span>
      </div>
    </div>
  )
}
