import type { ReactNode } from 'react'
import type { HealthVerdict } from './HealthVerdict'

/** One health dimension: its name, its verdict, and the facts behind it. */
export type HealthTileProps = {
  readonly title: string
  readonly icon: ReactNode
  readonly verdict: HealthVerdict
  readonly children: ReactNode
}
