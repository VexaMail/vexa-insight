import type { KpiSeries, TrendSeriesInput } from '@/types/dashboard'
import { bucketCountSum } from './bucketCountSum'
import { bucketReportingDomains } from './bucketReportingDomains'
import { bucketTotals } from './bucketTotals'
import { dmarcPassRate } from './dmarcPassRate'
import { rateSeries } from './rateSeries'

/** The sparkline behind each KPI tile, from the same daily rollup rows. */
export function buildKpiSeries(input: TrendSeriesInput): KpiSeries {
  const { buckets, daily } = input
  return {
    messages: buckets.map((b) => bucketTotals(daily, b).total),
    passRate: rateSeries(input, dmarcPassRate),
    reportingDomains: buckets.map((b) => bucketReportingDomains(daily, b)),
    reports: buckets.map((b) => bucketCountSum(input.reports, b)),
  }
}
