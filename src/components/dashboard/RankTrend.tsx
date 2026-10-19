import { Sparkline } from '@/components/ui'
import type { RankTrendProps } from './RankTrendProps'

/** The trend cell of a ranked table, hidden on a phone. */
export function RankTrend({ values, label }: Readonly<RankTrendProps>) {
  return (
    <span className="hidden sm:block">
      {values ? (
        <Sparkline
          values={values}
          tone="danger"
          className="h-6 w-full"
          label={label}
        />
      ) : null}
    </span>
  )
}
