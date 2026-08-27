import type { SpfCheckResult } from '@/types/diagnostics'

export function analyzeLimits(spf: string): SpfCheckResult[] {
  const checks: SpfCheckResult[] = []

  const includeCount = (spf.match(/include:/gi) ?? []).length
  const aCount = (spf.match(/(?:^|[\s+~?-])a(?=[:/\s]|$)/gi) ?? []).length
  const mxCount = (spf.match(/(?:^|[\s+~?-])mx(?=[:/\s]|$)/gi) ?? []).length
  const redirectCount = (spf.match(/redirect=/gi) ?? []).length
  const existsCount = (spf.match(/exists:/gi) ?? []).length

  const estimatedLookups =
    includeCount + aCount + mxCount + redirectCount + existsCount
  const withinLimit = estimatedLookups <= 10

  checks.push({
    name: 'DNS lookup limit (max 10)',
    passed: withinLimit,
    detail: withinLimit
      ? `Estimated ${String(estimatedLookups)} DNS lookups (within the 10-lookup limit).`
      : `Estimated ${String(estimatedLookups)} DNS lookups. Exceeds the 10-lookup limit, which causes PermError.`,
  })

  const recordLength = spf.length
  const withinCharLimit = recordLength <= 450
  checks.push({
    name: 'Record length',
    passed: withinCharLimit,
    detail: withinCharLimit
      ? `Record is ${String(recordLength)} characters (under 450-character recommendation).`
      : `Record is ${String(recordLength)} characters. Consider flattening to reduce length.`,
  })

  return checks
}
