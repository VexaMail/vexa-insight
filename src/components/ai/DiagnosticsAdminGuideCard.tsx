'use client'

import type { DiagnosticsAdminGuideCardProps } from './DiagnosticsAdminGuideCardProps'

export function DiagnosticsAdminGuideCard({
  guide,
}: Readonly<DiagnosticsAdminGuideCardProps>) {
  let severityClasses = 'border-emerald-500/30 bg-emerald-500/5'

  if (guide.severity === 'critical') {
    severityClasses = 'border-red-500/30 bg-red-500/5'
  } else if (guide.severity === 'high') {
    severityClasses = 'border-orange-500/30 bg-orange-500/5'
  } else if (guide.severity === 'medium') {
    severityClasses = 'border-amber-500/30 bg-amber-500/5'
  }

  return (
    <article className={`rounded-xl border p-4 shadow-sm ${severityClasses}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            {guide.severity}
          </p>
          <h4 className="text-foreground text-sm font-semibold">
            {guide.title}
          </h4>
          <p className="text-muted-foreground text-sm">{guide.summary}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <p className="text-foreground text-xs font-semibold tracking-wide uppercase">
            Why It Matters
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            {guide.whyItMatters}
          </p>
        </div>

        <div>
          <p className="text-foreground text-xs font-semibold tracking-wide uppercase">
            How To Fix
          </p>
          <p className="text-muted-foreground mt-1 text-sm">{guide.howToFix}</p>
        </div>

        <div>
          <p className="text-foreground text-xs font-semibold tracking-wide uppercase">
            Verify
          </p>
          <ul className="text-muted-foreground mt-1 space-y-1 text-sm">
            {guide.verifySteps.map((step) => (
              <li key={step} className="bg-background/70 rounded-md px-3 py-2">
                <code className="font-mono text-xs break-all whitespace-pre-wrap">
                  {step}
                </code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
