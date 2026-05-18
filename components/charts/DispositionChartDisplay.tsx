'use client'

import type { DispositionChartProps } from '@/types/charts'
import { DispositionChartInner } from './dispositionChartLazy'

/**
 * Display-only version of DispositionChart for use when you already have
 * pass/fail counts (e.g. domain detail page) and don't need the global filter.
 */
export default function DispositionChartDisplay(
  props: Readonly<DispositionChartProps>,
) {
  return <DispositionChartInner {...props} />
}
