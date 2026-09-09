import type { EngineHeaderProps } from './EngineHeaderProps'
import type { EngineSummaryProps } from './EngineSummaryProps'

export type CronsEngineCardProps = EngineHeaderProps &
  EngineSummaryProps & {
    readonly totalEmails: number
    readonly processingEmails: number
    readonly ratePerSecond: number
    readonly etaFormatted: string
    readonly statusText: string | null
  }
