import dynamic from 'next/dynamic'

export const SpfDkimChartInner = dynamic(() => import('./_SpfDkimChart'), {
  ssr: false,
})
