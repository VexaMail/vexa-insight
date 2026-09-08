/** When to look this IP up again, and the retry state that decided it. */
export type HostnameLookupSchedule = {
  retryCount: number
  nextLookupAt: Date
  lastSuccessAt: Date | null
}
