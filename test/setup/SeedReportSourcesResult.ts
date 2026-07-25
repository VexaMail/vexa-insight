/**
 * Ids produced by {@link seedReportSourcesFixture}.
 */
export type SeedReportSourcesResult = {
  rawReportId: number
  /** Event ids in insertion order: two matching IP-A events, one differing IP-A event, one IP-B event. */
  eventIds: number[]
}
