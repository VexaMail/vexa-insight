'use client'

import type { DispositionChartProps } from '@/types/charts'
import dynamic from 'next/dynamic'

/**
 * Display-only version of DispositionChart for use when you already have
 * pass/fail counts (e.g. domain detail page) and don't need the global filter.
 */
export default function DispositionChartDisplay(
  props: Readonly<DispositionChartProps>,
) {
  const DispositionChartInner = dynamic(() => import('./_DispositionChart'), {
    ssr: false,
  })
  return <DispositionChartInner {...props} />
}
