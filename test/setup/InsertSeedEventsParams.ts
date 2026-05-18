/**
 * Input shape for {@link insertSeedEvents}.
 */
export type InsertSeedEventsParams = {
  rawReportId: number
  domainId: number
  ipId: number
  eventsPerReport: number
  beginUnix: number
  endUnix: number
  now: Date
}
