import type { ReportsFilterSelectProps } from './ReportsFilterSelectProps'

/** One "all X" dropdown of the reports toolbar. */
export function ReportsFilterSelect({
  label,
  value,
  options,
  onChange,
}: ReportsFilterSelectProps) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      className="bg-background border-input focus-visible:ring-primary text-foreground h-9 cursor-pointer rounded-md border px-3 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
    >
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
