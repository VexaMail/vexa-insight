/**
 * Most failure reports stored per reported domain per UTC day. With `fo=1`
 * a receiver reports every SPF or DKIM failure, so a broken forwarder can
 * send thousands a day; past the cap they are dropped, not stored.
 */
export const FORENSIC_DAILY_CAP_PER_DOMAIN = 500
