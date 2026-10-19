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
      className="bg-card border-border focus-visible:ring-ring text-foreground h-10 w-full min-w-0 cursor-pointer rounded-md border px-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none lg:w-auto"
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
