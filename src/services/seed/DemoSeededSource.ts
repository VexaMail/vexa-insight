import type { DemoSource } from './DemoSource'

/** A demo source paired with the row id `ensureDemoIp` gave it. */
export type DemoSeededSource = {
  readonly id: number
  readonly source: DemoSource
}
