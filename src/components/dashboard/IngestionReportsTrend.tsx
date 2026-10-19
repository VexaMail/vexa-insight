import { Sparkline } from '@/components/ui'
import type { IngestionFactsProps } from './IngestionFactsProps'

/** Reports per day over the window, as small bars. */
export function IngestionReportsTrend({
  reportsTrend,
}: Readonly<Pick<IngestionFactsProps, 'reportsTrend'>>) {
  return (
    <Sparkline
      values={reportsTrend}
      kind="bars"
      tone="info"
      className="h-5 w-24 sm:ml-auto"
      label="Reports per day"
    />
  )
}
