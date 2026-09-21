import dynamic from 'next/dynamic'

export const IngestActivityChartInner = dynamic(
  async () => import('./_IngestActivityChart'),
  { ssr: false },
)
