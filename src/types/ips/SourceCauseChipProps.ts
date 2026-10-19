import type { StatusTone } from '@/types/ui'

export type SourceCauseChipProps = {
  readonly href: string
  readonly label: string
  readonly count: number
  readonly tone: StatusTone
  readonly active: boolean
  readonly title?: string
}
