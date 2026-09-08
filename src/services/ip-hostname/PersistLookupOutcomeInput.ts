import type { executeDns } from './executeDns'
import type { HostnameLookupSchedule } from './HostnameLookupSchedule'

export type PersistLookupOutcomeInput = {
  ip: string
  now: Date
  lookup: Awaited<ReturnType<typeof executeDns>>
  schedule: HostnameLookupSchedule
}
