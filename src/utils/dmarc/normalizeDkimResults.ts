import type { DkimAuthResultPayload } from '@/types/dmarc'

import { isDkimDomainAligned } from './isDkimDomainAligned'
import { normalizeDkimAuthResult } from './normalizeDkimAuthResult'
import { readStringField } from './readStringField'
import { readUnknownField } from './readUnknownField'

export function normalizeDkimResults(
  rawDkimList: unknown,
  headerFrom: string,
): DkimAuthResultPayload[] {
  if (!rawDkimList) return []
  const list: unknown[] = Array.isArray(rawDkimList)
    ? rawDkimList
    : [rawDkimList]
  return list.map((item) => {
    const domain = readStringField(item, 'domain')
    const selector = readStringField(item, 'selector')
    const result = normalizeDkimAuthResult(readUnknownField(item, 'result'))
    return {
      domain,
      selector,
      result,
      isAligned: isDkimDomainAligned(domain, headerFrom),
    }
  })
}
