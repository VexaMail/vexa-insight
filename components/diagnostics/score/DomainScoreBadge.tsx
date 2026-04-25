import type { DomainScoreBadgeProps } from './DomainScoreBadgeProps'

export function DomainScoreBadge({
  score,
  domain,
}: Readonly<DomainScoreBadgeProps>) {
  const gradeColors: Record<string, string> = {
    A: 'from-emerald-500 to-emerald-600 shadow-emerald-500/25',
    B: 'from-blue-500 to-blue-600 shadow-blue-500/25',
    C: 'from-amber-500 to-amber-600 shadow-amber-500/25',
    D: 'from-orange-500 to-orange-600 shadow-orange-500/25',
    F: 'from-red-500 to-red-600 shadow-red-500/25',
  }
  const gradeTextColors: Record<string, string> = {
    A: 'text-emerald-500',
    B: 'text-blue-500',
    C: 'text-amber-500',
    D: 'text-orange-500',
    F: 'text-red-500',
  }
  const gradientClass = gradeColors[score.grade] ?? gradeColors.F
  const textColor = gradeTextColors[score.grade] ?? gradeTextColors.F

  return (
    <div className="bg-card flex flex-col items-center gap-4 rounded-xl border p-6 shadow-sm sm:flex-row sm:gap-8">
      {/* Grade circle */}
      <div
        className={`flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-lg ${gradientClass}`}
      >
        <span className="text-4xl font-black text-white">{score.grade}</span>
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
          <span className={`text-3xl font-black ${textColor}`}>
            {score.percentage}%
          </span>
          <span className="text-muted-foreground text-sm">overall score</span>
        </div>
        {/* Progress bar */}
        <div className="bg-muted mt-2 h-2 w-full max-w-xs overflow-hidden rounded-full">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${gradientClass} transition-all duration-500`}
            style={{ width: `${score.percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
