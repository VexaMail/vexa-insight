'use client'

import type { IpHostnameToggleProps } from './IpHostnameToggleProps'

/** Checkbox setting of the IP-to-hostname lookup section. */
export function IpHostnameToggle({
  id,
  label,
  checked,
  labelClassName,
  onToggle,
}: IpHostnameToggleProps) {
  return (
    <div className="flex min-h-10 items-center gap-2.5">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => {
          onToggle(e.target.checked)
        }}
        className="accent-primary focus-visible:ring-ring h-4 w-4 cursor-pointer rounded focus-visible:ring-2"
      />
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
    </div>
  )
}
