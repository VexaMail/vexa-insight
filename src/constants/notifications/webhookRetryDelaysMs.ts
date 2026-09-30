/**
 * Waits before each webhook retry. Four attempts at most, and with the 5s
 * request timeout a dead endpoint is given up on within about 45 seconds.
 */
export const WEBHOOK_RETRY_DELAYS_MS: readonly number[] = [1_000, 4_000, 16_000]
