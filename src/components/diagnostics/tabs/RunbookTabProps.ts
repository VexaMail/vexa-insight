import type { DomainScore } from '@/types/diagnostics'
import type { ReactNode } from 'react'

export type RunbookTabProps = {
  readonly score: DomainScore
  readonly children?: ReactNode
}
