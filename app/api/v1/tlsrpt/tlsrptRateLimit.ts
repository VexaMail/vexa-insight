/** Reports accepted per client address per window on the HTTPS receiver. */
export const TLSRPT_RATE_LIMIT = {
  limit: 60,
  windowMs: 60 * 60 * 1000,
} as const
