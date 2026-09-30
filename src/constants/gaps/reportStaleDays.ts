/**
 * Days without an aggregate report after which a domain that used to get
 * them counts as silent. Receivers report daily, and a day or two of delay is
 * normal, so three leaves room before calling it a gap.
 */
export const REPORT_STALE_DAYS = 3
