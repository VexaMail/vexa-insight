import {
  dmarcPolicyOptions,
  dmarcSubdomainPolicyOptions,
} from '@/constants/diagnostics'
import { DmarcAlignmentChecks } from './DmarcAlignmentChecks'
import type { DmarcGeneratorFormProps } from './DmarcGeneratorFormProps'
import { DmarcReportFields } from './DmarcReportFields'
import { SelectField } from './SelectField'

export function DmarcGeneratorForm({
  values,
  setField,
}: Readonly<DmarcGeneratorFormProps>) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <SelectField
        id="dmarc-p"
        label="Policy (p)"
        value={values.policy}
        options={dmarcPolicyOptions}
        onChange={(value) => {
          setField('policy', value)
        }}
      />
      <SelectField
        id="dmarc-sp"
        label="Subdomain policy (sp)"
        value={values.subdomainPolicy}
        options={dmarcSubdomainPolicyOptions}
        onChange={(value) => {
          setField('subdomainPolicy', value)
        }}
      />
      <DmarcReportFields values={values} setField={setField} />
      <DmarcAlignmentChecks values={values} setField={setField} />
    </div>
  )
}
