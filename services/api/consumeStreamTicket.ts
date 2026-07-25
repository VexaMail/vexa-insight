import { streamTicketStore } from './streamTicketStorePrivate'

/**
 * Redeems a stream ticket. Returns true only for a ticket that exists and has
 * not expired; the ticket is removed either way, so it can never be replayed
 * from a proxy access log or browser history.
 *
 * A dropped EventSource therefore cannot silently reconnect on the same URL —
 * the client has to mint a new ticket, which is the point.
 */
export function consumeStreamTicket(ticket: string | undefined): boolean {
  if (!ticket) return false

  const expiresAt = streamTicketStore.get(ticket)
  if (expiresAt == null) return false

  streamTicketStore.delete(ticket)
  return expiresAt > Date.now()
}
