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
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => {
          onToggle(e.target.checked)
        }}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
    </div>
  )
}
