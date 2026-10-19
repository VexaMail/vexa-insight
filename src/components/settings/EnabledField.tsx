import type { EnabledFieldProps } from './EnabledFieldProps'
import { EnabledSwitch } from './EnabledSwitch'

/** The enabled switch of an editor dialog, with its current meaning beside it. */
export function EnabledField({
  checked,
  offLabel,
  onChange,
}: Readonly<EnabledFieldProps>) {
  return (
    <div className="flex items-center gap-3">
      <EnabledSwitch checked={checked} label="Enabled" onChange={onChange} />
      <span className="text-sm">{checked ? 'Enabled' : offLabel}</span>
    </div>
  )
}
