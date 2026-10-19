import { formatPercentTick } from '@/utils/dashboard'
import { chartAxisTick } from './chartAxisTick'

/** A fixed 0-100% Y axis, so a small change in rate is not exaggerated. */
export const percentAxisProps = {
  domain: [0, 100],
  ticks: [0, 25, 50, 75, 100],
  tickFormatter: formatPercentTick,
  tick: chartAxisTick,
  axisLine: false,
  tickLine: false,
}
