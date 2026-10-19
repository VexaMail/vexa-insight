import type { DomainInsights, DomainSourceRow } from '@/types/domains'
import { buildFailureReasons } from './buildFailureReasons'

/** Source, country and failure figures of a domain's sources. */
export function buildDomainInsights(
  rows: readonly DomainSourceRow[],
): DomainInsights {
  const failing = rows.filter((row) => row.failing > 0)
  const countries = new Set(
    rows.flatMap((row) => (row.countryCode ? [row.countryCode] : [])),
  )
  return {
    uniqueSources: rows.length,
    countries: countries.size,
    failingSources: failing.length,
    forwardedSources: failing.filter((row) => row.kind === 'forwarded').length,
    failingMessages: failing.reduce((total, row) => total + row.failing, 0),
    reasons: buildFailureReasons(rows),
  }
}
