import { STREAM_TICKET_TTL_MS } from '@/constants/api'
import crypto from 'node:crypto'
import { streamTicketStore } from './streamTicketStorePrivate'

/**
 * Mints a single-use ticket that authorizes one Server-Sent Events connection.
 *
 * Callers must have already passed normal header-based admin auth. The ticket
 * is what travels in the URL query string instead of the long-lived
 * `SECRET_KEY`, because EventSource cannot set request headers.
 *
 * Expired tickets are pruned on every mint, so the store cannot grow unbounded
 * from connections that are never opened.
 */
export function issueStreamTicket(): string {
  const now = Date.now()
  for (const [ticket, expiresAt] of streamTicketStore) {
    if (expiresAt <= now) streamTicketStore.delete(ticket)
  }

  const ticket = crypto.randomBytes(24).toString('hex')
  streamTicketStore.set(ticket, now + STREAM_TICKET_TTL_MS)
  return ticket
}
