/**
 * Domains resolved at once by the diagnostics index. Each domain issues about
 * forty lookups; far above this, resolvers start dropping queries and the
 * timeouts read as missing records.
 */
export const diagnosticsOverviewConcurrency = 6
