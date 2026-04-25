import { buildAssessmentSummary } from './buildAssessmentSummary'
import { deriveRiskLevel } from './deriveRiskLevel'
import type { DiagnosticsOverallAssessmentProps } from './DiagnosticsOverallAssessmentProps'
import { RISK_BADGE_STYLES } from './riskBadgeStyles'
import { RISK_LABELS } from './riskLabels'

export function DiagnosticsOverallAssessment({
  stats,
  dmarcPolicy,
  fallbackRecommendations,
  hasAiInsights,
}: Readonly<DiagnosticsOverallAssessmentProps>) {
  const riskLevel = deriveRiskLevel(stats, dmarcPolicy)
  const summary = buildAssessmentSummary(stats, dmarcPolicy)

  return (
    <section
      aria-labelledby="overall-assessment-heading"
      className="bg-card rounded-lg border p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2
            id="overall-assessment-heading"
            className="text-base font-semibold"
          >
            Overall Assessment
          </h2>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            {summary}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${RISK_BADGE_STYLES[riskLevel]}`}
        >
          {RISK_LABELS[riskLevel]}
        </span>
      </div>

      {!hasAiInsights && fallbackRecommendations.length > 0 && (
        <div className="mt-4 space-y-2 border-t pt-3">
          <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            Key observations
          </p>
          {fallbackRecommendations.map((rec) => (
            <div key={rec.type} className="text-sm">
              <p className="font-medium">{rec.title}</p>
              <p className="text-muted-foreground text-xs">
                {rec.recommendation}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
