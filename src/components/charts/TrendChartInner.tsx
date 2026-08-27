import dynamic from 'next/dynamic'

export const TrendChartInner = dynamic(() => import('./_TrendChart'), {
  ssr: false,
})
