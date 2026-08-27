import type { DkimAuthResultPayload } from '@/types/dmarc'

import { normalizeDkimAuthResult } from './normalizeDkimAuthResult'

export function normalizeDkimResults(
  rawDkimList: unknown,
  headerFrom: string,
): DkimAuthResultPayload[] {
  if (!rawDkimList) return []
  const list = Array.isArray(rawDkimList) ? rawDkimList : [rawDkimList]
  return list.map((item) => {
    const domain = typeof item?.domain === 'string' ? item.domain : ''
    const selector = typeof item?.selector === 'string' ? item.selector : ''
    const result = normalizeDkimAuthResult(item?.result)
    const isAligned =
      domain.length > 0 &&
      headerFrom.length > 0 &&
      (domain === headerFrom || headerFrom.endsWith(`.${domain}`))
    return { domain, selector, result, isAligned }
  })
}
