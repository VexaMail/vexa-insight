import type { DkimAuthResult } from './DkimAuthResult'

export type DkimAuthResultPayload = {
  domain: string
  selector: string
  result: DkimAuthResult
  isAligned: boolean
}
