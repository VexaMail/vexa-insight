import type { DomainScore } from '@/types/diagnostics'

export function scoreToGrade(score: number): DomainScore['grade'] {
  if (score >= 80) return 'A'
  if (score >= 60) return 'B'
  if (score >= 40) return 'C'
  if (score >= 20) return 'D'
  return 'F'
}
