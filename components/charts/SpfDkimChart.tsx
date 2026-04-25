'use client'

import { Skeleton } from '@/components/ui'
import { useSpfDkimChart } from '@/hooks/charts'
import { SpfDkimChartInner } from './SpfDkimChartInner'

export default function SpfDkimChart() {
  const { data, isLoading } = useSpfDkimChart()

  if (isLoading) {
    return (
      <div className="glass-card p-5">
        <Skeleton className="mb-4 h-4 w-40" />
        <Skeleton className="h-[220px] w-full rounded-lg" />
      </div>
    )
  }

  return <SpfDkimChartInner data={data} />
}
