import {
  INSTALL_INPUT_CLASS_NAME,
  INSTALL_LABEL_CLASS_NAME,
  INSTALL_PLACEHOLDER_CLASS_NAME,
} from '@/constants/install'
import type { InstallRequiredFieldProps } from './InstallRequiredFieldProps'

/** Required installer field: a label and a placeholder-carrying input. */
export function InstallRequiredField({
  id,
  label,
  type,
  value,
  placeholder,
  onChange,
}: InstallRequiredFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={`mb-1 ${INSTALL_LABEL_CLASS_NAME}`}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        required
        placeholder={placeholder}
        className={`${INSTALL_INPUT_CLASS_NAME} ${INSTALL_PLACEHOLDER_CLASS_NAME}`}
      />
    </div>
  )
}
