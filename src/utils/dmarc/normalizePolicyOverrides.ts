import type { PolicyOverridePayload } from '@/types/dmarc'

import { normalizePolicyOverrideType } from './normalizePolicyOverrideType'

export function normalizePolicyOverrides(
  rawReasonList: unknown,
): PolicyOverridePayload[] {
  if (!rawReasonList) return []
  const list: unknown[] = Array.isArray(rawReasonList)
    ? rawReasonList
    : [rawReasonList]
  return list.map((item) => {
    const record =
      typeof item === 'object' && item !== null
        ? (item as Record<string, unknown>)
        : undefined
    const type = normalizePolicyOverrideType(record?.['type'])
    const comment =
      typeof record?.['comment'] === 'string' ? record['comment'] : null
    return { type, comment }
  })
}
