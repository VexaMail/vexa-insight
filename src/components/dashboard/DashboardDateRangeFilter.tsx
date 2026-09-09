import { DateRangeFilter } from '@/components/filters'
import type { DateRangeFilterProps } from '@/types/filters'
import { Suspense } from 'react'

/** The header date filter with the placeholder shown while it hydrates. */
export function DashboardDateRangeFilter(
  props: Readonly<DateRangeFilterProps>,
) {
  return (
    <Suspense
      fallback={
        <div className="bg-secondary h-9 w-[160px] animate-pulse rounded-md" />
      }
    >
      <DateRangeFilter {...props} />
    </Suspense>
  )
}
