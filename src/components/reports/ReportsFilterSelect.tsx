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
      className="bg-card border-border hover:border-primary/40 focus-visible:ring-ring text-foreground h-10 min-w-0 cursor-pointer rounded-md border px-3 text-sm transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none sm:max-w-56"
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
