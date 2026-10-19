import { DashboardDateRangeFilter } from './DashboardDateRangeFilter'
import { TriageGreeting } from './TriageGreeting'
import type { TriageHeaderProps } from './TriageHeaderProps'

/** Greeting, what the page is for and its window, and the date filter. */
export function TriageHeader({
  days,
  basePath,
  from,
  to,
  windowLabel,
}: Readonly<TriageHeaderProps>) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0 space-y-1.5">
        <TriageGreeting />
        <p className="text-muted-foreground text-sm">
          Here&apos;s what needs attention across your monitored domains.{' '}
          <span className="whitespace-nowrap">
            Showing {windowLabel} (UTC report days).
          </span>
        </p>
      </div>
      <DashboardDateRangeFilter
        currentDays={days}
        basePath={basePath}
        from={from}
        to={to}
      />
    </header>
  )
}
