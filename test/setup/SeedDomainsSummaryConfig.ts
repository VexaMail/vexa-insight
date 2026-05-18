/**
 * Input shape for {@link seedDomainsSummaryFixture}.
 */
export type SeedDomainsSummaryConfig = {
  domainCount: number
  reportsPerDomain: number
  eventsPerReport: number
  beginUnix: number
  endUnix: number
  now: Date
}
