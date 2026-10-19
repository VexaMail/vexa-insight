import { PassRateTrendChart } from '@/components/charts'
import { EmptyState, Panel } from '@/components/ui'
import { trendRangeDefault, trendRangeOptions } from '@/utils/dashboard'
import { ShieldCheck } from 'lucide-react'
import { Suspense } from 'react'
import { PassRateTrendLegend } from './PassRateTrendLegend'
import type { PassRateTrendPanelProps } from './PassRateTrendPanelProps'
import { TrendRangeSelect } from './TrendRangeSelect'

/** Daily share of messages passing and failing DMARC, not their volume. */
export function PassRateTrendPanel({
  points,
  window,
  trendLabel,
  className,
}: Readonly<PassRateTrendPanelProps>) {
  const hasData = points.some((p) => p.total > 0)
  return (
    <Panel
      className={className ?? ''}
      icon={<ShieldCheck />}
      title="Global DMARC pass rate trend"
      description={`Share of each UTC report day's messages, ${trendLabel}. Days without reports are gaps.`}
      actions={
        <Suspense
          fallback={<span className="bg-secondary h-8 w-32 rounded-md" />}
        >
          <TrendRangeSelect
            options={trendRangeOptions(window)}
            fallback={trendRangeDefault(window)}
          />
        </Suspense>
      }
    >
      <div className="mb-2 flex justify-end">
        <PassRateTrendLegend />
      </div>
      {hasData ? (
        <PassRateTrendChart data={points} />
      ) : (
        <EmptyState>No report data in this period.</EmptyState>
      )}
    </Panel>
  )
}
