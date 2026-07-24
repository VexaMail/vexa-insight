import { z } from 'zod'

/**
 * Port accepted by the IMAP connection test endpoint.
 * Numbers inside the valid range are used as-is, strings are parsed, and
 * anything else (missing, out of range, unparsable) falls back to IMAPS 993.
 */
export const imapTestPortSchema = z
  .unknown()
  .optional()
  .transform((value) => {
    let port = 993
    if (typeof value === 'number' && value >= 1 && value <= 65535) {
      port = value
    } else if (typeof value === 'string') {
      port = Number.parseInt(value, 10)
    }
    return Number.isFinite(port) && port >= 1 && port <= 65535 ? port : 993
  })
