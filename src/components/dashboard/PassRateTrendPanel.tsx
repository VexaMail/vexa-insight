import { PassRateTrendChart } from '@/components/charts'
import { EmptyState, Panel } from '@/components/ui'
import { ShieldCheck } from 'lucide-react'
import { PassRateTrendLegend } from './PassRateTrendLegend'
import type { PassRateTrendPanelProps } from './PassRateTrendPanelProps'

/** Daily share of messages passing and failing DMARC, not their volume. */
export function PassRateTrendPanel({
  points,
  window,
  className,
}: Readonly<PassRateTrendPanelProps>) {
  const hasData = points.some((p) => p.total > 0)
  return (
    <Panel
      className={className ?? ''}
      icon={<ShieldCheck />}
      title="Global DMARC pass rate trend"
      description={`Share of each UTC report day's messages, ${window.label}. Days without reports are gaps.`}
      actions={<PassRateTrendLegend />}
    >
      {hasData ? (
        <PassRateTrendChart data={points} />
      ) : (
        <EmptyState>No report data in this period.</EmptyState>
      )}
    </Panel>
  )
}
