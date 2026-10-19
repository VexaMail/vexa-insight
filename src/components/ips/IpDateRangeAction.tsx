import { DateRangeFilter } from '@/components/filters'
import type { IpDateRangeActionProps } from '@/types/ips'
import { Suspense } from 'react'

/** The window picker of a source page, in its header. */
export function IpDateRangeAction({
  days,
  basePath,
  from,
  to,
}: Readonly<IpDateRangeActionProps>) {
  return (
    <Suspense
      fallback={
        <div className="bg-secondary h-10 w-[160px] animate-pulse rounded-md" />
      }
    >
      <DateRangeFilter
        currentDays={days}
        basePath={basePath}
        from={from}
        to={to}
      />
    </Suspense>
  )
}
