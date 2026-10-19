import { spfAllOptions } from '@/constants/diagnostics'
import { CheckField } from './CheckField'
import { SelectField } from './SelectField'
import type { SpfGeneratorFormProps } from './SpfGeneratorFormProps'

/** The `all` qualifier and the bare `a` and `mx` mechanisms. */
export function SpfMechanismFields({
  values,
  setField,
}: Readonly<SpfGeneratorFormProps>) {
  return (
    <>
      <SelectField
        id="spf-all"
        label="Everything else"
        value={values.all}
        options={spfAllOptions}
        onChange={(value) => {
          setField('all', value)
        }}
      />
      <div className="flex flex-wrap items-end gap-x-4">
        <CheckField
          label="The domain's A record (a)"
          checked={values.a}
          onChange={(checked) => {
            setField('a', checked)
          }}
        />
        <CheckField
          label="Its MX hosts (mx)"
          checked={values.mx}
          onChange={(checked) => {
            setField('mx', checked)
          }}
        />
      </div>
    </>
  )
}
