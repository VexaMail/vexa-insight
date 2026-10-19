import type { SpfGeneratorFormProps } from './SpfGeneratorFormProps'
import { SpfMechanismFields } from './SpfMechanismFields'
import { TextField } from './TextField'

export function SpfGeneratorForm({
  values,
  setField,
}: Readonly<SpfGeneratorFormProps>) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <TextField
        id="spf-include"
        label="Includes"
        value={values.includes}
        placeholder="_spf.example.net"
        className="sm:col-span-2"
        onChange={(value) => {
          setField('includes', value)
        }}
      />
      <TextField
        id="spf-ip4"
        label="IPv4 addresses or ranges"
        value={values.ip4}
        placeholder="192.0.2.0/24"
        onChange={(value) => {
          setField('ip4', value)
        }}
      />
      <TextField
        id="spf-ip6"
        label="IPv6 addresses or ranges"
        value={values.ip6}
        placeholder="2001:db8::/32"
        onChange={(value) => {
          setField('ip6', value)
        }}
      />
      <SpfMechanismFields values={values} setField={setField} />
    </div>
  )
}
