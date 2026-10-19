import { chartAxisTick } from './chartAxisTick'

/** The day axis of a daily trend. */
export const dateAxisProps = {
  dataKey: 'date',
  tick: chartAxisTick,
  axisLine: false,
  tickLine: false,
  minTickGap: 24,
} as const
