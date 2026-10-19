import { IpFlag } from '@/components/ips'
import { formatPercent } from '@/utils/format'
import type { InsightFactsProps } from './InsightFactsProps'
import { InsightRow } from './InsightRow'

/** Domain, primary country, volume, failure rate and sources, all reports. */
export function InsightFacts({
  domainName,
  insights,
  summary,
}: Readonly<InsightFactsProps>) {
  const country = insights.primaryCountry
  const failureRate =
    summary.totalMessages > 0
      ? formatPercent((summary.failedCount / summary.totalMessages) * 100)
      : 'n/a'
  return (
    <dl className="space-y-1.5 text-xs">
      <InsightRow label="Domain">{domainName}</InsightRow>
      <InsightRow
        label="Primary country"
        title={
          country
            ? `${formatPercent(country.share)} of messages came from sources located there`
            : undefined
        }
      >
        {country ? (
          <span className="inline-flex items-center gap-1.5">
            <IpFlag countryCode={country.code} countryName={country.name} />
            {country.name}
          </span>
        ) : (
          'Unknown'
        )}
      </InsightRow>
      <InsightRow label="Total messages" mono>
        {summary.totalMessages.toLocaleString('en-US')}
      </InsightRow>
      <InsightRow
        label="Failure rate"
        mono
        title="DMARC failures of all messages"
      >
        {failureRate}
      </InsightRow>
      <InsightRow label="Unique sources" mono>
        {insights.uniqueSources.toLocaleString('en-US')}
      </InsightRow>
    </dl>
  )
}
