import type { StatusTone } from '@/types/ui'

/** One health dimension's state: its colour and the words for it. */
export type HealthVerdict = {
  readonly tone: StatusTone
  readonly label: string
}
