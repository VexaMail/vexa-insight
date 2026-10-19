import type { RateVerdict } from './RateVerdict'

/** One of the five authentication facts of a source, explained. */
export type IpAuthCheck = {
  readonly key: string
  readonly label: string
  readonly count: number
  readonly rate: number
  readonly verdict: RateVerdict
  /** One plain sentence saying what the stored results show. */
  readonly detail: string
}
