import { CheckField } from './CheckField'
import type { DmarcGeneratorFormProps } from './DmarcGeneratorFormProps'

/** The DMARC flags: strict alignment per protocol and the `fo=1` request. */
export function DmarcAlignmentChecks({
  values,
  setField,
}: Readonly<DmarcGeneratorFormProps>) {
  return (
    <div className="flex flex-col justify-end">
      <CheckField
        label="Strict DKIM alignment (adkim=s)"
        checked={values.strictDkim}
        onChange={(checked) => {
          setField('strictDkim', checked)
        }}
      />
      <CheckField
        label="Strict SPF alignment (aspf=s)"
        checked={values.strictSpf}
        onChange={(checked) => {
          setField('strictSpf', checked)
        }}
      />
      <CheckField
        label="Failure report on any failure (fo=1)"
        checked={values.reportAnyFailure}
        onChange={(checked) => {
          setField('reportAnyFailure', checked)
        }}
      />
    </div>
  )
}
