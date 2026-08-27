import type { DkimAuthResultPayload } from '@/types/dmarc'

import { normalizeDkimAuthResult } from './normalizeDkimAuthResult'

export function normalizeDkimResults(
  rawDkimList: unknown,
  headerFrom: string,
): DkimAuthResultPayload[] {
  if (!rawDkimList) return []
  const list: unknown[] = Array.isArray(rawDkimList)
    ? rawDkimList
    : [rawDkimList]
  return list.map((item) => {
    const domain =
      typeof item === 'object' &&
      item !== null &&
      'domain' in item &&
      typeof item.domain === 'string'
        ? item.domain
        : ''
    const selector =
      typeof item === 'object' &&
      item !== null &&
      'selector' in item &&
      typeof item.selector === 'string'
        ? item.selector
        : ''
    const result = normalizeDkimAuthResult(
      typeof item === 'object' && item !== null && 'result' in item
        ? item.result
        : undefined,
    )
    const isAligned =
      domain.length > 0 &&
      headerFrom.length > 0 &&
      (domain === headerFrom || headerFrom.endsWith(`.${domain}`))
    return { domain, selector, result, isAligned }
  })
}
