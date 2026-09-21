'use client'

import type { IpSectionSelectProps } from './IpSectionSelectProps'

/** One dropdown of an IP detail section toolbar. */
export function IpSectionSelect({
  label,
  value,
  options,
  allLabel,
  onChange,
}: Readonly<IpSectionSelectProps>) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(event) => {
        onChange(event.target.value)
      }}
      className="bg-background border-input focus-visible:ring-primary text-foreground h-9 cursor-pointer rounded-md border px-2 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
    >
      {allLabel === undefined ? null : <option value="">{allLabel}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
