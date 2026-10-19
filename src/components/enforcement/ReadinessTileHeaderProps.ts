import type { StatusTone } from '@/types/ui'

export type ReadinessTileHeaderProps = {
  readonly tone: StatusTone
  /** Short verdict, e.g. "Fix first". */
  readonly label: string
  readonly atRisk: boolean
  readonly reviewHref: string
}
