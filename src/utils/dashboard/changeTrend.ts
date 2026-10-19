import type { ChangeItem, TrendSeriesInput } from '@/types/dashboard'
import { bucketTotals } from './bucketTotals'
import { cumulativeDomainSeries } from './cumulativeDomainSeries'
import { dmarcPassRate } from './dmarcPassRate'
import { domainIdsByName } from './domainIdsByName'
import { failedOf } from './failedOf'
import { failRateOf } from './failRateOf'
import { rateSeries } from './rateSeries'
import { sparklineShape } from './sparklineShape'

/**
 * The daily series a change line is about, or null when none exists in the
 * rollups (new failing sources are counted per IP, which the rollups lack).
 */
export function changeTrend(
  item: ChangeItem,
  input: TrendSeriesInput,
): number[] | null {
  const ids = item.domainNames
    ? domainIdsByName(input.domains, item.domainNames)
    : null
  if (item.id.startsWith('failed:')) {
    return input.buckets.map((b) => failedOf(bucketTotals(input.daily, b, ids)))
  }
  if (item.id === 'now-compliant') {
    return sparklineShape(rateSeries(input, dmarcPassRate, ids))
  }
  if (item.id === 'failure-rate') {
    return sparklineShape(rateSeries(input, failRateOf))
  }
  if (item.id === 'domains-added') return cumulativeDomainSeries(input)
  return null
}
