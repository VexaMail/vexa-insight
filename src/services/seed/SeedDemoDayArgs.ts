import type { DemoSeededSource } from './DemoSeededSource'

export type SeedDemoDayArgs = {
  dayStart: Date
  dayEnd: Date
  domainName: string
  domainId: number
  sources: DemoSeededSource[]
  now: Date
}
