'use client'

import dynamic from 'next/dynamic'

/** Client-only: recharts measures the container it renders into. */
export const PassRateTrendChart = dynamic(
  async () => import('./_PassRateTrendChart'),
  { ssr: false },
)
