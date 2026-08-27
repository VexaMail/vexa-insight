/**
 * Process-scoped store of unredeemed SSE stream tickets, keyed by ticket value
 * with the epoch-ms expiry as the value. Single source of truth; do NOT mutate
 * elsewhere. Imported only by services/api/{issue,consume}StreamTicket.ts.
 *
 * In-memory is sufficient: the deployment topology is a single replica
 * (ADR 0003), and a ticket only has to survive the few milliseconds between
 * minting it and the browser opening the EventSource.
 */
export const streamTicketStore = new Map<string, number>()
