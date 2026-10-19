import type { TimelineDay } from './TimelineDay'
import type { TimelineEvent } from './TimelineEvent'

export type DomainHealthTimeline = {
  readonly domain: string
  readonly days: readonly TimelineDay[]
  /** Newest first. */
  readonly events: readonly TimelineEvent[]
}
