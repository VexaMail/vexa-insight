import type { DomainScore } from '@/types/diagnostics'

export function scoreToGrade(score: number): DomainScore['grade'] {
  if (score >= 90) return 'A'
  if (score >= 75) return 'B'
  if (score >= 60) return 'C'
  if (score >= 40) return 'D'
  return 'F'
}
