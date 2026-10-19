import type { DomainPeriodTotals, TrendSeriesInput } from '@/types/dashboard'
import { failRateOf } from './failRateOf'
import { rateSeries } from './rateSeries'

/** Daily DMARC fail rate of each listed domain, keyed by domain id. */
export function domainFailTrends(
  input: TrendSeriesInput,
  domains: readonly DomainPeriodTotals[],
): Record<string, number[]> {
  return Object.fromEntries(
    domains.map((d) => [
      String(d.domainId),
      rateSeries(input, failRateOf, new Set([d.domainId])),
    ]),
  )
}
