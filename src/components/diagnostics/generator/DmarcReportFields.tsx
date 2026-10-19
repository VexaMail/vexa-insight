import type { DmarcGeneratorFormProps } from './DmarcGeneratorFormProps'
import { TextField } from './TextField'

/** Where DMARC reports go, and the share of mail the policy covers. */
export function DmarcReportFields({
  values,
  setField,
}: Readonly<DmarcGeneratorFormProps>) {
  return (
    <>
      <TextField
        id="dmarc-rua"
        label="Aggregate reports to (rua)"
        value={values.rua}
        placeholder="dmarc@example.com"
        onChange={(value) => {
          setField('rua', value)
        }}
      />
      <TextField
        id="dmarc-ruf"
        label="Failure reports to (ruf)"
        value={values.ruf}
        placeholder="optional"
        onChange={(value) => {
          setField('ruf', value)
        }}
      />
      <TextField
        id="dmarc-pct"
        label="Share of mail the policy applies to (pct)"
        value={values.percent}
        onChange={(value) => {
          setField('percent', value)
        }}
      />
    </>
  )
}
