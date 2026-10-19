import type { DomainStatusSelectProps } from './DomainStatusSelectProps'

/** The status filter of the domains list. */
export function DomainStatusSelect({
  value,
  onChange,
}: Readonly<DomainStatusSelectProps>) {
  return (
    <select
      value={value}
      onChange={onChange}
      aria-label="Filter domains by status"
      className="border-border bg-card text-foreground focus-visible:ring-ring h-10 w-full rounded-md border px-3 text-sm transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none sm:w-auto"
    >
      <option value="All">All statuses</option>
      <option value="Active">Passing (95% and up)</option>
      <option value="Warning">Warning (80-95%)</option>
      <option value="Critical">Critical (below 80%)</option>
      <option value="No data">No data</option>
    </select>
  )
}
