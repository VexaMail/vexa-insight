'use client'

import { Skeleton } from '@/components/ui'
import { useTrendChart } from '@/hooks/charts'
import { TrendChartInner } from './TrendChartInner'

export default function TrendChart() {
  const { data, isLoading } = useTrendChart()

  if (isLoading) {
    return (
      <div className="glass-card p-5">
        <Skeleton className="mb-4 h-4 w-36" />
        <Skeleton className="h-[220px] w-full rounded-lg" />
      </div>
    )
  }

  return <TrendChartInner data={data} />
}
