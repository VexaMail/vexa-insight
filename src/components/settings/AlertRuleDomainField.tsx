import { Input } from '@/components/ui'
import {
  SETTINGS_INPUT_CLASS_NAME,
  SETTINGS_LABEL_CLASS_NAME,
} from '@/constants/settings'
import type { AlertRuleFieldsProps } from './AlertRuleFieldsProps'

/** The domain a rule watches; empty watches every domain. */
export function AlertRuleDomainField({
  form,
  setForm,
}: Readonly<AlertRuleFieldsProps>) {
  return (
    <div>
      <label htmlFor="alert-rule-domain" className={SETTINGS_LABEL_CLASS_NAME}>
        Domain
      </label>
      <Input
        id="alert-rule-domain"
        maxLength={253}
        value={form.domainName}
        placeholder="All domains"
        className={`${SETTINGS_INPUT_CLASS_NAME} font-mono`}
        onChange={(e) => {
          setForm((prev) => ({ ...prev, domainName: e.target.value }))
        }}
      />
    </div>
  )
}
