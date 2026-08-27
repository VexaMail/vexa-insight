/**
 * Lifetime of a Server-Sent Events stream ticket. Long enough for the browser
 * to open the EventSource right after minting it, short enough that a ticket
 * captured from a proxy access log is already dead.
 */
export const STREAM_TICKET_TTL_MS = 30_000
