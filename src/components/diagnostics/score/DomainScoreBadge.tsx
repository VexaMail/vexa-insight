import type { DomainScoreBadgeProps } from './DomainScoreBadgeProps'
import { gradeGradientClasses } from './gradeGradientClasses'
import { gradePrintClasses } from './gradePrintClasses'
import { gradeTextClasses } from './gradeTextClasses'

export function DomainScoreBadge({
  score,
  domain,
}: Readonly<DomainScoreBadgeProps>) {
  const gradientClass =
    gradeGradientClasses[score.grade] ?? gradeGradientClasses['F']
  const textColor = gradeTextClasses[score.grade] ?? gradeTextClasses['F']
  const printClass = gradePrintClasses[score.grade] ?? gradePrintClasses['F']

  return (
    <div className="bg-card flex flex-col items-center gap-4 rounded-xl border p-6 shadow-sm sm:flex-row sm:gap-8">
      {/* Grade circle */}
      <div
        className={`flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-lg print:border-4 print:bg-none print:shadow-none ${String(gradientClass)} ${String(printClass)}`}
      >
        <span
          className={`text-4xl font-black text-white ${String(printClass)}`}
        >
          {score.grade}
        </span>
      </div>

      {/* Score details */}
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
          <span className="text-muted-foreground text-sm">overall score</span>
        </div>
        {/* Progress bar */}
        <div className="bg-muted mt-2 h-2 w-full max-w-xs overflow-hidden rounded-full">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${String(gradientClass)} transition-all duration-500`}
            style={{ width: `${String(score.percentage)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
