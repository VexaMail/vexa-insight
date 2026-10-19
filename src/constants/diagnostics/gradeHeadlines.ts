import type { DomainScore } from '@/types/diagnostics'

export const gradeHeadlines: Record<DomainScore['grade'], string> = {
  A: 'Strong posture',
  B: 'Good posture',
  C: 'Gaps to close',
  D: 'Significant gaps',
  F: 'Weak posture',
}
