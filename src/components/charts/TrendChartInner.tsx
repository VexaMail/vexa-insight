import dynamic from 'next/dynamic'

export const TrendChartInner = dynamic(async () => import('./_TrendChart'), {
  ssr: false,
})
