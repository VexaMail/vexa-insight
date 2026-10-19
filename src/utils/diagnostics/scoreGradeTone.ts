import type { DomainScore } from '@/types/diagnostics'
import type { StatusTone } from '@/types/ui'

export function scoreGradeTone(grade: DomainScore['grade']): StatusTone {
  if (grade === 'A' || grade === 'B') return 'success'
  if (grade === 'C') return 'warning'
  return 'danger'
}
