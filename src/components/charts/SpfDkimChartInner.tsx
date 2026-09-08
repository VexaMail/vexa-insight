import dynamic from 'next/dynamic'

export const SpfDkimChartInner = dynamic(
  async () => import('./_SpfDkimChart'),
  {
    ssr: false,
  },
)
