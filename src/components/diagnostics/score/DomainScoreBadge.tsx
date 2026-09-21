import type { DomainScoreBadgeProps } from './DomainScoreBadgeProps'
import { DomainScoreBreakdown } from './DomainScoreBreakdown'
import { DomainScoreGradeCircle } from './DomainScoreGradeCircle'
import { gradeGradientClasses } from './gradeGradientClasses'
import { gradeTextClasses } from './gradeTextClasses'

export function DomainScoreBadge({
  score,
  domain,
}: Readonly<DomainScoreBadgeProps>) {
  const gradientClass =
    gradeGradientClasses[score.grade] ?? gradeGradientClasses['F']
  const textColor = gradeTextClasses[score.grade] ?? gradeTextClasses['F']

  return (
    <div className="bg-card rounded-xl border p-6 shadow-sm">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
        <DomainScoreGradeCircle grade={score.grade} />

        <div className="flex flex-col text-center sm:text-left">
          <h2 className="text-foreground text-lg font-bold">
            Domain Security Score
          </h2>
          <p className="text-muted-foreground text-sm">
            Analysis for{' '}
            <span className="text-foreground font-semibold">{domain}</span>
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-3xl font-black ${String(textColor)}`}>
              {score.percentage}%
            </span>
            <span className="text-muted-foreground text-sm">
              {score.coreScore}/100 core
              {score.bonusScore > 0
                ? ` +${String(score.bonusScore)} bonus`
                : ''}
            </span>
          </div>
          <div className="bg-muted mt-2 h-2 w-full max-w-xs overflow-hidden rounded-full">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${String(gradientClass)} transition-all duration-500`}
              style={{ width: `${String(score.percentage)}%` }}
            />
          </div>
        </div>
      </div>

      <DomainScoreBreakdown score={score} />
    </div>
  )
}
