'use client'

import { parseSourceClassFilter } from '@/utils/domains'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/**
 * The sources tab filters as URL parameters, so a filtered view can be shared.
 * Classification and country filter on the client; the window reloads data.
 */
export function useSourceFilterParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const buildUrl = (key: string, value: string, fallback: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === fallback) params.delete(key)
    else params.set(key, value)
    params.set('tab', 'sources')
    return `${pathname}?${params.toString()}`
  }

  return {
    classFilter: parseSourceClassFilter(searchParams.get('class')),
    country: searchParams.get('country') ?? 'all',
    setClass: (value: string) => {
      window.history.replaceState(null, '', buildUrl('class', value, 'all'))
    },
    setCountry: (value: string) => {
      window.history.replaceState(null, '', buildUrl('country', value, 'all'))
    },
    setDays: (value: string) => {
      router.push(buildUrl('days', value, '0'), { scroll: false })
    },
  }
}
