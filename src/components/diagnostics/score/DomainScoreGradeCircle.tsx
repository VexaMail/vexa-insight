import type { DomainScoreGradeCircleProps } from './DomainScoreGradeCircleProps'
import { gradeGradientClasses } from './gradeGradientClasses'
import { gradePrintClasses } from './gradePrintClasses'

/** The large letter grade of the diagnostics header. */
export function DomainScoreGradeCircle({
  grade,
}: Readonly<DomainScoreGradeCircleProps>) {
  const gradientClass = gradeGradientClasses[grade] ?? gradeGradientClasses['F']
  const printClass = gradePrintClasses[grade] ?? gradePrintClasses['F']

  return (
    <div
      className={`flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-lg print:border-4 print:bg-none print:shadow-none ${String(gradientClass)} ${String(printClass)}`}
    >
      <span className={`text-4xl font-black text-white ${String(printClass)}`}>
        {grade}
      </span>
    </div>
  )
}
