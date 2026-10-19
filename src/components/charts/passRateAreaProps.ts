/** The pass-share area of the overview trend. */
export const passRateAreaProps = {
  type: 'monotone',
  dataKey: 'passRate',
  name: 'Pass',
  stroke: 'hsl(var(--chart-pass))',
  fill: 'url(#passGrad)',
  strokeWidth: 2,
  connectNulls: false,
  isAnimationActive: false,
} as const
