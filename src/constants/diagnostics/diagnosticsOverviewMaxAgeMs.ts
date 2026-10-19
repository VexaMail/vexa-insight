/**
 * How old a domain's stored DNS run may be before the diagnostics index runs
 * it again. The daily check refreshes every domain, so on an ordinary visit
 * nothing is older than this and no lookup runs.
 */
export const diagnosticsOverviewMaxAgeMs = 24 * 60 * 60 * 1000
