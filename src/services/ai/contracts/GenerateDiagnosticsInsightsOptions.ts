export type GenerateDiagnosticsInsightsOptions = {
  domainName: string
  domainId: number
  startDate?: Date | undefined
  endDate?: Date | undefined
  timeoutMs?: number | undefined
  maxTokens?: number | undefined
  temperature?: number | undefined
}
