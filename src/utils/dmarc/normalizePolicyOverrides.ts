import type { PolicyOverridePayload } from '@/types/dmarc'

import { normalizePolicyOverrideType } from './normalizePolicyOverrideType'

export function normalizePolicyOverrides(
  rawReasonList: unknown,
): PolicyOverridePayload[] {
  if (!rawReasonList) return []
  const list = Array.isArray(rawReasonList) ? rawReasonList : [rawReasonList]
  return list.map((item) => {
    const type = normalizePolicyOverrideType(item?.type)
    const comment = typeof item?.comment === 'string' ? item.comment : null
    return { type, comment }
  })
}
