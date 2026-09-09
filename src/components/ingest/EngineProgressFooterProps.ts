export type EngineProgressFooterProps = {
  readonly statusText: string | null | undefined
  readonly processingEmails: number
  readonly ratePerSecond: number
  readonly etaFormatted: string
}
