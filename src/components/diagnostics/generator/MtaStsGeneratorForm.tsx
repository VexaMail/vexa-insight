import { mtaStsModeOptions } from '@/constants/diagnostics'
import type { MtaStsGeneratorFormProps } from './MtaStsGeneratorFormProps'
import { SelectField } from './SelectField'
import { TextField } from './TextField'

export function MtaStsGeneratorForm({
  values,
  setField,
}: Readonly<MtaStsGeneratorFormProps>) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <SelectField
        id="mta-sts-mode"
        label="Mode"
        value={values.mode}
        options={mtaStsModeOptions}
        onChange={(value) => {
          setField('mode', value)
        }}
      />
      <TextField
        id="mta-sts-max-age"
        label="Cache time in seconds (max_age)"
        value={values.maxAge}
        onChange={(value) => {
          setField('maxAge', value)
        }}
      />
      <TextField
        id="mta-sts-mx"
        label="MX hosts"
        value={values.mx}
        placeholder="mx1.example.com"
        onChange={(value) => {
          setField('mx', value)
        }}
      />
      <TextField
        id="mta-sts-id"
        label="Policy id"
        value={values.id}
        onChange={(value) => {
          setField('id', value)
        }}
      />
    </div>
  )
}
