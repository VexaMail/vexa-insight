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
      className="sm:col-span-2 lg:col-span-2 xl:col-span-4 2xl:col-span-1"
    >
      <div className="grid gap-3 xl:grid-cols-2 xl:gap-6 2xl:grid-cols-1 2xl:gap-3">
        <InsightFacts
          domainName={domainName}
          insights={insights}
          summary={summary}
        />
        <div className="border-border border-t pt-3 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-6 2xl:border-t 2xl:border-l-0 2xl:pt-3 2xl:pl-0">
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
      </div>
    </DecisionTile>
  )
}
