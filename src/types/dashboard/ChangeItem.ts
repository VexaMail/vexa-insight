import type { ChangeDirection } from './ChangeDirection'

/** One line of "What changed since the previous period". */
export type ChangeItem = {
  id: string
  /** The headline figure, e.g. "+120%", "+3", "-0.7 pts". */
  value: string
  /** What happened, e.g. "DMARC failures increased". */
  title: string
  /** Domain, source or scope it happened to, e.g. "example.com". */
  subject: string
  detail: string
  direction: ChangeDirection
  /** True when something appeared that was not there before. */
  isNew: boolean
  /** Unix seconds of the newest evidence; null when there is none. */
  lastSeenAt: number | null
  href: string | null
  /** The domains the change is about, when it is about some of them. */
  domainNames?: readonly string[]
  /** Daily values behind the change over the current period, oldest first. */
  trend?: number[]
}
