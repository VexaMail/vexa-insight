'use client'

import type { DateRangeFilterProps } from '@/types/filters'
import { Suspense } from 'react'
import { DateRangeFilterContent } from './DateRangeFilterContent'

export default function DateRangeFilter(props: Readonly<DateRangeFilterProps>) {
  return (
    <Suspense
      fallback={
        <div className="bg-secondary h-9 w-[160px] animate-pulse rounded-md" />
      }
    >
      <DateRangeFilterContent {...props} />
    </Suspense>
  )
}
