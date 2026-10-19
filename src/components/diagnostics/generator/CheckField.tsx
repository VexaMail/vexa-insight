import type { CheckFieldProps } from './CheckFieldProps'

/** A labelled checkbox of a record generator form. */
export function CheckField({
  label,
  checked,
  onChange,
}: Readonly<CheckFieldProps>) {
  return (
    <label className="text-foreground flex min-h-8 items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => {
          onChange(event.target.checked)
        }}
        className="accent-primary h-4 w-4 shrink-0"
      />
      {label}
    </label>
  )
}
