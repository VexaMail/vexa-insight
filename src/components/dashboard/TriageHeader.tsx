import { PageHeader } from '@/components/shell'
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
    <PageHeader
      title={<TriageGreeting />}
      description={
        <>
          Here&apos;s what needs attention across your monitored domains.{' '}
          <span className="whitespace-nowrap">
            Showing {windowLabel} (UTC report days).
          </span>
        </>
      }
      period={
        <DashboardDateRangeFilter
          currentDays={days}
          basePath={basePath}
          from={from}
          to={to}
        />
      }
    />
  )
}
