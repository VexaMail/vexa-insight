import type { StatusTone } from '@/types/ui'

/** A pass rate read as one word and a tone. */
export type RateVerdict = {
  readonly label: 'Pass' | 'Fail' | 'Partial' | 'No data'
  readonly tone: StatusTone
}
