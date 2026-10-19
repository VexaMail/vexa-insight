import { ArrowRight, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { DecisionTile } from './DecisionTile'
import { InsightFacts } from './InsightFacts'
import type { InsightsTileProps } from './InsightsTileProps'
import { ReasonBar } from './ReasonBar'

/** Volume, sources, countries and the top reasons DMARC fails, all reports. */
export function InsightsTile({
  insights,
  summary,
  diagnosticsHref,
}: Readonly<InsightsTileProps>) {
  return (
    <DecisionTile
      icon={<BarChart3 />}
      title="Domain insights"
      badge={
        <span className="text-muted-foreground text-[11px]">All reports</span>
      }
      className="sm:col-span-2 lg:col-span-2 xl:col-span-1"
    >
      <InsightFacts insights={insights} summary={summary} />
      <div className="border-border border-t pt-3">
        <p className="text-foreground mb-2 text-xs font-medium">
          Top failing reasons
        </p>
        {insights.reasons.length === 0 ? (
          <p className="text-muted-foreground text-xs">
            No DMARC failures in the reports.
          </p>
        ) : (
          <ul className="space-y-1.5">
            {insights.reasons.slice(0, 4).map((reason) => (
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
        className="border-border bg-secondary/40 hover:bg-accent text-foreground focus-visible:ring-ring mt-auto inline-flex min-h-10 items-center justify-center gap-2 rounded-md border text-xs font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
      >
        View full diagnostics <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </DecisionTile>
  )
}
