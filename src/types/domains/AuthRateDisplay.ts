import type { StatusTone } from '@/types/ui'

/** How a share of passing messages reads in a table cell. */
export type AuthRateDisplay = {
  readonly tone: StatusTone
  readonly label: string
  readonly title: string
}
