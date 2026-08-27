import dynamic from 'next/dynamic'

export const DispositionChartInner = dynamic(
  () => import('./_DispositionChart'),
  { ssr: false },
)
