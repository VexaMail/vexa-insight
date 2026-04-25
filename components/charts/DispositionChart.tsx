'use client'

import { Skeleton } from '@/components/ui'
import { useDispositionChart } from '@/hooks/charts'
import { DispositionChartInner } from './DispositionChartInner'

export default function DispositionChart() {
  const { passed, failed, isLoading } = useDispositionChart()

  if (isLoading) {
    return (
      <div className="glass-card p-5">
        <Skeleton className="mb-4 h-4 w-28" />
        <Skeleton className="h-[220px] w-full rounded-lg" />
      </div>
    )
  }

  return <DispositionChartInner passed={passed} failed={failed} />
}
