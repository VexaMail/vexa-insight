import dynamic from 'next/dynamic'

export const DispositionChartInner = dynamic(
  async () => import('./_DispositionChart'),
  { ssr: false },
)
