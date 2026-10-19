import { ArrowRight, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { DecisionTile } from './DecisionTile'
import { InsightFacts } from './InsightFacts'
import type { InsightsTileProps } from './InsightsTileProps'
import { ReasonBar } from './ReasonBar'

/** Sources, countries and the top reasons DMARC fails, over all reports. */
export function InsightsTile({
  insights,
  diagnosticsHref,
}: Readonly<InsightsTileProps>) {
  return (
    <DecisionTile
      icon={<BarChart3 />}
      title="Domain insights"
      className="sm:col-span-2 lg:col-span-2 2xl:col-span-1"
    >
      <InsightFacts insights={insights} />
      <div>
        <p className="text-foreground mb-1.5 text-xs font-medium">
          Top failing reasons, all reports
        </p>
        {insights.reasons.length === 0 ? (
          <p className="text-muted-foreground text-xs">
            No DMARC failures in the reports.
          </p>
        ) : (
          <ul className="space-y-1.5">
            {insights.reasons.map((reason) => (
              <ReasonBar
                key={reason.key}
                reason={reason}
                outOf={insights.failingMessages}
              />
            ))}
          </ul>
        )}
      </div>
      <Link
        href={diagnosticsHref}
        className="border-border hover:bg-accent text-foreground mt-auto inline-flex min-h-10 items-center justify-center gap-2 rounded-md border text-xs font-medium transition-colors duration-150"
      >
        View full diagnostics <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </DecisionTile>
  )
}
