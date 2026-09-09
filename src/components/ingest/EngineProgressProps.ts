export type EngineProgressProps = {
  readonly currentProcessed: number
  readonly totalEmails: number
  readonly processingEmails: number
  readonly ratePerSecond: number
  readonly etaFormatted: string
  readonly statusText?: string | null
}
