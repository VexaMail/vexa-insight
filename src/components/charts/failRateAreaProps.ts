/** The fail-share area of the overview trend. */
export const failRateAreaProps = {
  type: 'monotone',
  dataKey: 'failRate',
  name: 'Fail',
  stroke: 'hsl(var(--chart-fail))',
  fill: 'url(#failGrad)',
  strokeWidth: 2,
  connectNulls: false,
  isAnimationActive: false,
} as const
