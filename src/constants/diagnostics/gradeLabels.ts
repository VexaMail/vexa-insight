import type { DomainScore } from '@/types/diagnostics'

/** The word on the grade pill; D and F both read as poor. */
export const gradeLabels: Record<DomainScore['grade'], string> = {
  A: 'Excellent',
  B: 'Good',
  C: 'Fair',
  D: 'Poor',
  F: 'Poor',
}
