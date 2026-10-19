import type { DomainScore } from '@/types/diagnostics'
import type { StatusTone } from '@/types/ui'

export type ScoreFigureProps = {
  readonly score: DomainScore
  readonly tone: StatusTone
}
