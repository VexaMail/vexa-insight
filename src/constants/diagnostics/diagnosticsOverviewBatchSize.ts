/**
 * Domains the diagnostics index asks the server to check per request. Small
 * enough that rows fill in every few seconds, large enough to keep the
 * server's lookups at full concurrency.
 */
export const diagnosticsOverviewBatchSize = 12
