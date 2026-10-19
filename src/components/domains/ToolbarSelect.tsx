import type { ToolbarSelectProps } from './ToolbarSelectProps'

/** A labelled native select for table toolbars: works on phones as is. */
export function ToolbarSelect({
  label,
  value,
  options,
  onChange,
}: Readonly<ToolbarSelectProps>) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(event) => {
        onChange(event.target.value)
      }}
      className="border-border bg-card text-foreground focus-visible:ring-ring h-10 min-w-0 rounded-md border px-3 text-sm transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
