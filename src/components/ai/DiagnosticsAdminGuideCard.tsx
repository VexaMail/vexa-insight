'use client'

import { guideAnchorId } from '@/utils/diagnostics'
import type { DiagnosticsAdminGuideCardProps } from './DiagnosticsAdminGuideCardProps'
import { DiagnosticsGuideField } from './DiagnosticsGuideField'
import { DiagnosticsGuideVerifySteps } from './DiagnosticsGuideVerifySteps'
import { guideSeverityClasses } from './guideSeverityClasses'

export function DiagnosticsAdminGuideCard({
  guide,
}: Readonly<DiagnosticsAdminGuideCardProps>) {
  return (
    <article
      id={guideAnchorId(guide.id)}
      className={`scroll-mt-6 rounded-lg border p-4 ${guideSeverityClasses(guide.severity)}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-muted-foreground font-mono text-[11px] font-medium tracking-[0.16em] uppercase">
            {guide.severity}
          </p>
          <h4 className="text-foreground text-sm font-semibold">
            {guide.title}
          </h4>
          <p className="text-muted-foreground text-sm">{guide.summary}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <DiagnosticsGuideField
          label="Why It Matters"
          text={guide.whyItMatters}
        />
        <DiagnosticsGuideField label="How To Fix" text={guide.howToFix} />
        <DiagnosticsGuideVerifySteps steps={guide.verifySteps} />
      </div>
    </article>
  )
}
