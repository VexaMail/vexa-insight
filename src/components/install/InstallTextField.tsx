import {
  INSTALL_INPUT_CLASS_NAME,
  INSTALL_LABEL_CLASS_NAME,
} from '@/constants/install'
import type { InstallTextFieldProps } from './InstallTextFieldProps'

/** Labelled input of the installer form. */
export function InstallTextField({
  id,
  label,
  type,
  value,
  onChange,
  min,
  max,
  autoComplete,
}: InstallTextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={`mb-1 ${INSTALL_LABEL_CLASS_NAME}`}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        min={min}
        max={max}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        className={INSTALL_INPUT_CLASS_NAME}
      />
    </div>
  )
}
