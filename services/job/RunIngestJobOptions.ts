export type RunIngestJobOptions = {
  /**
   * Ignore the configured ingestion window and scan the whole mailbox.
   * Already-processed messages are still skipped by Message-ID.
   */
  fullRescan?: boolean
}
