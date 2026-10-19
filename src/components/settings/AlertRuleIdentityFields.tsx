import { Input } from '@/components/ui'
import {
  SETTINGS_INPUT_CLASS_NAME,
  SETTINGS_LABEL_CLASS_NAME,
} from '@/constants/settings'
import { AlertRuleDomainField } from './AlertRuleDomainField'
import type { AlertRuleFieldsProps } from './AlertRuleFieldsProps'
import { EnabledField } from './EnabledField'

/** Name, domain scope and the enabled switch of an alert rule. */
export function AlertRuleIdentityFields({
  form,
  setForm,
}: Readonly<AlertRuleFieldsProps>) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="alert-rule-name"
            className={SETTINGS_LABEL_CLASS_NAME}
          >
            Name
          </label>
          <Input
            id="alert-rule-name"
            required
            maxLength={120}
            value={form.name}
            placeholder="Pass rate drop"
            className={SETTINGS_INPUT_CLASS_NAME}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }}
          />
        </div>
        <AlertRuleDomainField form={form} setForm={setForm} />
      </div>
      <EnabledField
        checked={form.enabled}
        offLabel="Paused: not checked"
        onChange={(enabled) => {
          setForm((prev) => ({ ...prev, enabled }))
        }}
      />
    </div>
  )
}
