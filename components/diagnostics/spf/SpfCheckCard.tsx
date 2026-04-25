import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import type { SpfCheckCardProps } from './SpfCheckCardProps'

export function SpfCheckCard({
  category,
  checks,
}: Readonly<SpfCheckCardProps>) {
  const failedCount = checks.filter((c) => !c.passed).length
  const allPassed = failedCount === 0

  return (
    <div className="bg-background flex flex-col overflow-hidden rounded-lg border shadow-sm">
      <div className="bg-muted/30 flex items-center justify-between border-b px-4 py-3">
        <h4 className="text-foreground text-sm font-bold">{category}</h4>
        <div className="flex items-center gap-2">
          {allPassed ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500">
              <CheckCircle2 className="h-4 w-4" /> Passed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500">
              <AlertTriangle className="h-4 w-4" /> {failedCount} Issue
              {failedCount > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col divide-y">
        {checks.map((check, i) => (
          <div
            key={i}
            className="hover:bg-muted/10 flex items-start gap-3 p-4 transition-colors"
          >
            <div className="mt-0.5 flex-shrink-0">
              {check.passed ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-foreground text-sm font-medium">
                {check.name}
              </span>
              <span className="text-muted-foreground text-xs leading-relaxed">
                {check.detail}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
