import type { StatusTone } from '@/types/ui'

/** One context signal: what was found and how it reads. */
export type IpReputationStatus = {
  readonly value: string
  readonly label: string
  readonly tone: StatusTone
}
