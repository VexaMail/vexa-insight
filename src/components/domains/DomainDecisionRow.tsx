import { ReadinessTile } from '@/components/enforcement'
import { domainTabHref, sourcesReviewHref } from '@/utils/domains'
import { ComplianceTile } from './ComplianceTile'
import type { DomainDecisionRowProps } from './DomainDecisionRowProps'
import { ForwardersTile } from './ForwardersTile'
import { InsightsTile } from './InsightsTile'
import { PolicyTile } from './PolicyTile'

/**
 * The tiles that decide what to do with a domain next. Five fit side by side
 * only from 2xl; below that Key insights takes its own row so no card is
 * squeezed under ~220px.
 */
export function DomainDecisionRow({
  domainName,
  data,
}: Readonly<DomainDecisionRowProps>) {
  const { enforcement } = data
  const atRisk = enforcement.failingSourcesByKind.legitimate > 0
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)_minmax(0,1.15fr)_minmax(0,0.95fr)_minmax(0,1.1fr)]">
      <ComplianceTile
        summary={data.summary}
        trend={data.trend}
        dailyVolume={data.dailyVolume}
        historyHref={domainTabHref(domainName, 'history')}
      />
      <PolicyTile
        policy={data.policy}
        dnsHref={domainTabHref(domainName, 'dns')}
      />
      <ReadinessTile
        readiness={enforcement}
        reviewHref={sourcesReviewHref(
          domainName,
          enforcement.days,
          atRisk ? 'legitimate' : 'failing',
        )}
      />
      <ForwardersTile
        readiness={enforcement}
        reviewHref={sourcesReviewHref(
          domainName,
          enforcement.days,
          'forwarded',
        )}
      />
      <InsightsTile
        domainName={domainName}
        insights={data.insights}
        summary={data.summary}
        diagnosticsHref={`/diagnostics/${encodeURIComponent(domainName)}`}
      />
    </div>
  )
}
