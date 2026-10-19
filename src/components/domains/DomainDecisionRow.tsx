import { ReadinessTile } from '@/components/enforcement'
import { domainTabHref, sourcesReviewHref } from '@/utils/domains'
import { ComplianceTile } from './ComplianceTile'
import type { DomainDecisionRowProps } from './DomainDecisionRowProps'
import { ForwardersTile } from './ForwardersTile'
import { InsightsTile } from './InsightsTile'
import { PolicyTile } from './PolicyTile'

/** The tiles that decide what to do with a domain next. */
export function DomainDecisionRow({
  domainName,
  data,
}: Readonly<DomainDecisionRowProps>) {
  const { enforcement } = data
  const atRisk = enforcement.failingSourcesByKind.legitimate > 0
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,1.25fr)]">
      <ComplianceTile summary={data.summary} trend={data.trend} />
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
        insights={data.insights}
        diagnosticsHref={`/diagnostics/${encodeURIComponent(domainName)}`}
      />
    </div>
  )
}
