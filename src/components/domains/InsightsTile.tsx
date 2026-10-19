import { Lightbulb } from 'lucide-react'
import { DecisionTile } from './DecisionTile'
import { InsightFacts } from './InsightFacts'
import type { InsightsTileProps } from './InsightsTileProps'
import { ReasonRow } from './ReasonRow'

/** Key figures of the domain and the top reasons DMARC fails, all reports. */
export function InsightsTile({
  domainName,
  insights,
  summary,
  diagnosticsHref,
}: Readonly<InsightsTileProps>) {
  return (
    <DecisionTile
      icon={<Lightbulb />}
      title="Key insights"
      href={diagnosticsHref}
      className="sm:col-span-2 lg:col-span-2 xl:col-span-1"
    >
      <InsightFacts
        domainName={domainName}
        insights={insights}
        summary={summary}
      />
      <div className="border-border border-t pt-3">
        <p className="text-muted-foreground mb-2 text-xs">
          Top failure reasons, of failing messages
        </p>
        {insights.reasons.length === 0 ? (
          <p className="text-muted-foreground text-xs">
            No DMARC failures in the reports.
          </p>
        ) : (
          <ul className="space-y-1.5">
            {insights.reasons.slice(0, 4).map((reason, index) => (
              <ReasonRow
                key={reason.key}
                reason={reason}
                outOf={insights.failingMessages}
                index={index}
              />
            ))}
          </ul>
        )}
      </div>
    </DecisionTile>
  )
}
