import type { DomainScore } from '@/types/diagnostics'

/** A DomainScore literal for tests that only care about grade and percentage. */
export function makeDomainScore(
  grade: DomainScore['grade'],
  percentage: number,
): DomainScore {
  return {
    grade,
    percentage,
    coreScore: percentage,
    bonusScore: 0,
    checks: [],
  }
}
