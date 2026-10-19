import type { ReactNode } from 'react'
import type { EngineHeaderProps } from './EngineHeaderProps'

export type CronsEngineCardProps = EngineHeaderProps & {
  readonly currentProcessed: number
  readonly totalEmails: number
  readonly processingEmails: number
  readonly ratePerSecond: number
  readonly etaFormatted: string
  readonly statusText: string | null
  /** Server-rendered overall health state, top right of the panel. */
  readonly healthPill?: ReactNode
  /** Server-rendered scheduler, last run, next run and freshness facts. */
  readonly healthFacts?: ReactNode
}
