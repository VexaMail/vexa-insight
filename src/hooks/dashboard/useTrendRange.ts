'use client'

import type { UseTrendRangeReturn } from '@/types/dashboard'
import { withSearchParam } from '@/utils/dashboard'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/**
 * The trend chart's range in `?trend=`, defaulting to the page's window, so
 * the chart can look further back without changing the rest of the page.
 */
export function useTrendRange(fallback: string): UseTrendRangeReturn {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  return {
    value: searchParams.get('trend') ?? fallback,
    select: (value) => {
      const query = withSearchParam(searchParams.toString(), 'trend', value)
      router.push(`${pathname}?${query}`, { scroll: false })
    },
  }
}
